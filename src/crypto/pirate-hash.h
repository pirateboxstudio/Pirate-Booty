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

#ifndef PIRATE_HASH_H
#define PIRATE_HASH_H

#include <stddef.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

// Pirate Hash output size (32 bytes / 256 bits)
#define PIRATE_HASH_SIZE 32

// Pirate Hash is a hybrid two-phase PoW algorithm:
// Phase 1: Cuckoo Cycle (Memory-hard, ASIC-resistant)
// Phase 2: CryptoNight (CPU-friendly, cache-hard)
//
// Flow:
//   Block Header → Cuckoo Cycle → Proof Serialization → CryptoNight → Final Hash
//
// This combination forces miners to balance:
//   - Memory bandwidth (Cuckoo Cycle)
//   - CPU cache efficiency (CryptoNight)
//   - Keeping both CPU and GPU competitive
//   - Making ASICs economically unattractive

// Pirate Hash proof structure containing Cuckoo Cycle proof
typedef struct {
    uint64_t nonces[42];  // CUCKOO_PROOFSIZE from cuckoo-hash.h
    uint32_t proof_size;
} pirate_proof_t;

// Main Pirate Hash function
// Combines Cuckoo Cycle + CryptoNight for hybrid PoW
// 
// data: input block header data
// length: length of input data
// hash: output hash (32 bytes)
// height: block height (for CryptoNight variant selection)
// proof: optional Cuckoo Cycle proof output (can be NULL)
void pirate_hash(const void *data, size_t length, char *hash, uint64_t height, pirate_proof_t *proof);

// Verify a Pirate Hash proof
// 
// data: input block header data
// length: length of input data
// proof: the Cuckoo Cycle proof to verify
// hash: expected final hash
// height: block height
// 
// Returns: 1 if valid, 0 if invalid
int pirate_verify(const void *data, size_t length, const pirate_proof_t *proof, const char *hash, uint64_t height);

// Get Pirate Hash for a block (mining interface)
// This is the main PoW function called by the mining code
void get_pirate_hash(const void *data, size_t length, char *hash, uint64_t height);

// Alternative names for compatibility with existing Monero code
#define pirate_slow_hash pirate_hash
#define get_block_pirate_hash get_pirate_hash

#ifdef __cplusplus
}
#endif

#endif // PIRATE_HASH_H
