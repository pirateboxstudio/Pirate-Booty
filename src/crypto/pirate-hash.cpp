// Copyright (c) 2024, The Pirate Booty Project
// 
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
// 
// 1. Redistributions of source code must retain the above copyright notice, this list of
//    conditions and the following disclaimer.
// 
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//    of conditions and the following disclaimer in the documentation and/or other
//    materials provided with the distribution.
// 
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//    used to endorse or promote products derived from this software without specific
//    prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

#include "pirate-hash.h"
#include "cuckoo-hash.h"
#include "hash.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

extern "C" {

// CryptoNight slow hash function (from slow-hash.c)
extern void cn_slow_hash(const void *data, size_t length, char *hash, int variant, int prehashed, uint64_t height);

// Serialize Cuckoo Cycle proof for hashing
static void serialize_cuckoo_proof(const cuckoo_proof_t *cuckoo_proof, char *buffer, size_t *out_length) {
    // Serialize the 42 nonces from Cuckoo Cycle proof
    // Format: [nonce0][nonce1]...[nonce41]
    uint64_t *ptr = (uint64_t *)buffer;
    for (int i = 0; i < CUCKOO_PROOFSIZE; i++) {
        ptr[i] = cuckoo_proof->nonces[i];
    }
    *out_length = CUCKOO_PROOFSIZE * sizeof(uint64_t);
}

// Deserialize Cuckoo Cycle proof from buffer
static void deserialize_cuckoo_proof(const char *buffer, cuckoo_proof_t *cuckoo_proof) {
    const uint64_t *ptr = (const uint64_t *)buffer;
    for (int i = 0; i < CUCKOO_PROOFSIZE; i++) {
        cuckoo_proof->nonces[i] = ptr[i];
    }
}

void pirate_hash(const void *data, size_t length, char *hash, uint64_t height, pirate_proof_t *proof) {
    // 🏴‍☠️ PIRATE HASH: Two-Phase Hybrid PoW 🏴‍☠️
    //
    // Phase 1: Cuckoo Cycle (Memory-hard)
    //   - Forces use of RAM
    //   - ASIC-resistant
    //   - Produces a cycle proof
    //
    // Phase 2: CryptoNight (CPU-friendly)
    //   - Cache-hard
    //   - Latency sensitive
    //   - Good for consumer hardware
    
    cuckoo_proof_t cuckoo_proof;
    char intermediate_buffer[CUCKOO_PROOFSIZE * sizeof(uint64_t)];
    size_t intermediate_length;
    
    // Phase 1: Run Cuckoo Cycle on input data
    cuckoo_hash(data, length, intermediate_buffer, &cuckoo_proof);
    
    // Save proof if requested
    if (proof) {
        memcpy(proof->nonces, cuckoo_proof.nonces, sizeof(cuckoo_proof.nonces));
        proof->proof_size = CUCKOO_PROOFSIZE;
    }
    
    // Serialize the Cuckoo Cycle proof
    serialize_cuckoo_proof(&cuckoo_proof, intermediate_buffer, &intermediate_length);
    
    // Phase 2: Run CryptoNight on serialized Cuckoo proof
    // Variant selection based on height (for network upgrades)
    int variant = 4; // Start with CNv4 (CryptoNight-R)
    if (height >= 1000000) {
        variant = 4; // CNv4 / CryptoNight-R
    }
    
    cn_slow_hash(intermediate_buffer, intermediate_length, hash, variant, 0, height);
    
    // The result is a hash that requires both:
    // - Solving Cuckoo Cycle (memory bandwidth)
    // - Computing CryptoNight (CPU cache efficiency)
}

int pirate_verify(const void *data, size_t length, const pirate_proof_t *proof, const char *expected_hash, uint64_t height) {
    // Verify that the proof is valid and produces the expected hash
    
    if (!proof || proof->proof_size != CUCKOO_PROOFSIZE) {
        return 0;
    }
    
    // Convert pirate_proof_t to cuckoo_proof_t
    cuckoo_proof_t cuckoo_proof;
    memcpy(cuckoo_proof.nonces, proof->nonces, sizeof(cuckoo_proof.nonces));
    
    // Verify Cuckoo Cycle proof is valid
    cuckoo_pow_result_t cuckoo_result = cuckoo_verify(data, length, &cuckoo_proof);
    if (cuckoo_result != CUCKOO_POW_OK) {
        return 0;
    }
    
    // Compute the full Pirate Hash and compare
    char computed_hash[PIRATE_HASH_SIZE];
    pirate_hash(data, length, computed_hash, height, NULL);
    
    return memcmp(computed_hash, expected_hash, PIRATE_HASH_SIZE) == 0;
}

void get_pirate_hash(const void *data, size_t length, char *hash, uint64_t height) {
    pirate_hash(data, length, hash, height, NULL);
}

} // extern "C"
