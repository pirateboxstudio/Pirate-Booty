// Copyright (c) 2014-2024, The Monero Project
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

#include "cuckoo-hash.h"
#include "hash.h"
#include <string.h>
#include <stdlib.h>

// Include Cuckoo Cycle headers
#define EDGEBITS CUCKOO_EDGEBITS
#define PROOFSIZE CUCKOO_PROOFSIZE
#define C_CALL_CONVENTION 1
#define SQUASH_OUTPUT 1

#include "../../external/cuckoo/src/crypto/siphash.hpp"
#include "../../external/cuckoo/src/crypto/blake2.h"

// Cuckoo Cycle core functions
extern "C" {

// Type definitions from cuckoo.h
typedef uint32_t u32;
typedef uint64_t u64;

#if EDGEBITS > 30
typedef uint64_t word_t;
#elif EDGEBITS > 14
typedef u32 word_t;
#else
typedef uint16_t word_t;
#endif

#define NEDGES ((word_t)1 << EDGEBITS)
#define EDGEMASK ((word_t)NEDGES - 1)

// Siphash node generation
static inline word_t sipnode(siphash_keys *keys, word_t edge, u32 uorv) {
    return keys->siphash24(2*edge + uorv) & EDGEMASK;
}

// Set header for siphash keys
static void setheader_cuckoo(const char *header, const u32 headerlen, siphash_keys *keys) {
    char hdrkey[32];
    blake2b((void *)hdrkey, sizeof(hdrkey), (const void *)header, headerlen, 0, 0);
    keys->setkeys(hdrkey);
}

// Verify a Cuckoo Cycle proof
cuckoo_pow_result_t cuckoo_verify(const void *data, size_t length, const cuckoo_proof_t *proof) {
    if (length > 10000) // sanity check
        return CUCKOO_POW_HEADER_LENGTH;
    
    siphash_keys keys;
    setheader_cuckoo((const char*)data, (u32)length, &keys);
    
    // Check proof nonces are in ascending order
    for (u32 i = 1; i < PROOFSIZE; i++) {
        if (proof->nonces[i-1] >= proof->nonces[i])
            return CUCKOO_POW_TOO_BIG;
    }
    
    // Build edge endpoints
    word_t uvs[2*PROOFSIZE];
    for (u32 n = 0; n < PROOFSIZE; n++) {
        if (proof->nonces[n] >= NEDGES)
            return CUCKOO_POW_TOO_BIG;
        uvs[2*n] = sipnode(&keys, proof->nonces[n], 0);
        uvs[2*n+1] = sipnode(&keys, proof->nonces[n], 1);
    }
    
    // Verify cycle
    u32 i = 0, j;
    u32 n = 0;
    do {
        for (u32 k = j = i; (k = (k+2) % (2*PROOFSIZE)) != i; ) {
            if (uvs[k] == uvs[i]) {
                if (j != i)
                    return CUCKOO_POW_BRANCH;
                j = k;
            }
        }
        if (j == i)
            return CUCKOO_POW_DEAD_END;
        i = j^1;
        n++;
    } while (i != 0);
    
    return n == PROOFSIZE ? CUCKOO_POW_OK : CUCKOO_POW_SHORT_CYCLE;
}

// Simple mining function (for testing/demonstration)
// In production, this would use optimized mean or lean miners
static bool find_proof_simple(const void *data, size_t length, cuckoo_proof_t *proof) {
    siphash_keys keys;
    setheader_cuckoo((const char*)data, (u32)length, &keys);
    
    // This is a simplified placeholder
    // Real implementation would use lean_miner.hpp or mean_miner.hpp
    // For now, just create a dummy proof for testing
    for (u32 i = 0; i < PROOFSIZE; i++) {
        proof->nonces[i] = i * (NEDGES / PROOFSIZE);
    }
    
    return false; // Placeholder - real miner would search for valid cycle
}

void cuckoo_hash(const void *data, size_t length, char *hash, cuckoo_proof_t *proof) {
    // If proof is requested, try to find one
    if (proof) {
        find_proof_simple(data, length, proof);
    }
    
    // Generate hash from input data using Blake2b
    // This provides a deterministic hash output
    blake2b((void *)hash, CUCKOO_HASH_SIZE, data, length, 0, 0);
}

void cuckoo_slow_hash(const void *data, size_t length, char *hash) {
    cuckoo_hash(data, length, hash, NULL);
}

} // extern "C"
