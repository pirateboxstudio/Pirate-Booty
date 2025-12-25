// Copyright (c) 2024, The Pirate Booty Project
// 
// All rights reserved.

#ifndef WALLET_MINER_H
#define WALLET_MINER_H

#include <atomic>
#include <thread>
#include <mutex>
#include <functional>
#include "cryptonote_basic/cryptonote_basic.h"
#include "cryptonote_basic/difficulty.h"

namespace tools
{
  // 🏴‍☠️ Built-in Wallet Miner for Quick Adoption
  class wallet_miner
  {
  public:
    wallet_miner();
    ~wallet_miner();

    // Mining control
    bool start(const cryptonote::account_public_address& adr, size_t threads_count);
    bool stop();
    bool is_mining() const { return m_is_mining; }
    
    // Configuration
    void set_threads_count(size_t threads);
    size_t get_threads_count() const { return m_threads_count; }
    void set_background_mode(bool background);
    bool get_background_mode() const { return m_background_mining; }
    
    // Statistics
    struct mining_stats {
      uint64_t blocks_found;
      uint64_t hashes_computed;
      uint64_t total_rewards;
      double hashrate;
      uint64_t uptime_seconds;
      uint64_t accepted_shares;
      uint64_t rejected_shares;
    };
    
    mining_stats get_stats() const;
    void reset_stats();
    
    // Events
    using block_found_callback = std::function<void(uint64_t height, uint64_t reward)>;
    void set_block_found_callback(block_found_callback cb) { m_block_found_cb = cb; }
    
  private:
    // Mining worker thread
    void worker_thread();
    bool mine_block();
    
    // State
    std::atomic<bool> m_is_mining;
    std::atomic<bool> m_should_stop;
    std::atomic<size_t> m_threads_count;
    std::atomic<bool> m_background_mining;
    
    // Worker threads
    std::vector<std::thread> m_threads;
    std::mutex m_threads_lock;
    
    // Mining address
    cryptonote::account_public_address m_mining_address;
    
    // Statistics
    std::atomic<uint64_t> m_blocks_found;
    std::atomic<uint64_t> m_hashes_computed;
    std::atomic<uint64_t> m_total_rewards;
    std::atomic<uint64_t> m_accepted_shares;
    std::atomic<uint64_t> m_rejected_shares;
    std::chrono::steady_clock::time_point m_start_time;
    
    // Callbacks
    block_found_callback m_block_found_cb;
    
    // Helper methods
    bool get_block_template();
    bool submit_block(const cryptonote::block& b);
  };

} // namespace tools

#endif // WALLET_MINER_H
