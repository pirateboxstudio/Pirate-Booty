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

#ifndef CUCKOO_HASH_H
#define CUCKOO_HASH_H

#include <stddef.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

// Cuckoo Cycle parameters
#define CUCKOO_EDGEBITS 29
#define CUCKOO_PROOFSIZE 42
#define CUCKOO_HASH_SIZE 32

// Proof-of-work verification result codes
typedef enum {
    CUCKOO_POW_OK = 0,
    CUCKOO_POW_HEADER_LENGTH,
    CUCKOO_POW_TOO_BIG,
    CUCKOO_POW_TOO_SMALL,
    CUCKOO_POW_NON_MATCHING,
    CUCKOO_POW_BRANCH,
    CUCKOO_POW_DEAD_END,
    CUCKOO_POW_SHORT_CYCLE
} cuckoo_pow_result_t;

// Cuckoo Cycle proof structure
typedef struct {
    uint64_t nonces[CUCKOO_PROOFSIZE];
} cuckoo_proof_t;

// Generate Cuckoo Cycle hash from data
// data: input data to hash
// length: length of input data
// hash: output hash (32 bytes)
// proof: output proof-of-work cycle (optional, can be NULL)
void cuckoo_hash(const void *data, size_t length, char *hash, cuckoo_proof_t *proof);

// Verify a Cuckoo Cycle proof
// data: input data that was hashed
// length: length of input data
// proof: the proof-of-work cycle to verify
// Returns: CUCKOO_POW_OK if valid, error code otherwise
cuckoo_pow_result_t cuckoo_verify(const void *data, size_t length, const cuckoo_proof_t *proof);

// Generate slow hash using Cuckoo Cycle (proof-of-work)
// Similar to slow-hash.c interface for compatibility with existing Monero code
void cuckoo_slow_hash(const void *data, size_t length, char *hash);

#ifdef __cplusplus
}
#endif

#endif // CUCKOO_HASH_H
