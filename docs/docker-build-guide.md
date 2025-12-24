# 🏴‍☠️ Pirate Booty Docker Build Guide

## Quick Start

### Build and Run with Docker Compose
```bash
# Clone the repository
git clone https://github.com/yourname/piratebooty.git
cd piratebooty

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f piratebootyd

# Check status
docker-compose ps
```

### Services Included
- **piratebootyd** - Main blockchain daemon (ports 18080, 18081)
- **wallet-rpc** - Wallet RPC server (port 18082)
- **explorer** - Block explorer web interface (port 3000)

---

## Manual Docker Build

### Build the Image
```bash
# Basic build
docker build -t piratebooty:latest .

# Build with specific number of cores
docker build --build-arg NPROC=8 -t piratebooty:latest .

# Build for production
docker build --no-cache -t piratebooty:production .
```

### Run the Daemon
```bash
# Run daemon
docker run -d \
  --name piratebooty-daemon \
  -p 18080:18080 \
  -p 18081:18081 \
  -v piratebooty-data:/home/pirate/.piratebooty \
  -v piratebooty-wallet:/wallet \
  piratebooty:latest

# View logs
docker logs -f piratebooty-daemon

# Access daemon CLI
docker exec -it piratebooty-daemon piratebootyd status
```

### Run Wallet CLI
```bash
# Create a new wallet
docker exec -it piratebooty-daemon pirate-wallet-cli \
  --generate-new-wallet /wallet/mywallet \
  --daemon-address localhost:18081

# Open existing wallet
docker exec -it piratebooty-daemon pirate-wallet-cli \
  --wallet-file /wallet/mywallet \
  --daemon-address localhost:18081
```

---

## Docker Compose Configuration

### Full Stack Setup
```yaml
# docker-compose.yml
version: '3.8'

services:
  piratebootyd:
    build: .
    container_name: piratebooty-daemon
    ports:
      - "18080:18080"  # P2P
      - "18081:18081"  # RPC
    volumes:
      - piratebooty-data:/home/pirate/.piratebooty
      - piratebooty-wallet:/wallet
    restart: unless-stopped

  wallet-rpc:
    build: .
    container_name: piratebooty-wallet-rpc
    ports:
      - "18082:18082"
    volumes:
      - piratebooty-wallet:/wallet
    depends_on:
      - piratebootyd
    restart: unless-stopped

  explorer:
    image: nginx:alpine
    container_name: piratebooty-explorer
    ports:
      - "3000:80"
    volumes:
      - ./explorer/dist:/usr/share/nginx/html:ro
    depends_on:
      - piratebootyd
    restart: unless-stopped

volumes:
  piratebooty-data:
  piratebooty-wallet:
```

### Commands
```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d piratebootyd

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ WARNING: Deletes blockchain data!)
docker-compose down -v

# Restart services
docker-compose restart

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f piratebootyd

# Update and rebuild
docker-compose pull
docker-compose up -d --build
```

---

## Volume Management

### Backup Blockchain Data
```bash
# Backup blockchain
docker run --rm \
  -v piratebooty-data:/data \
  -v $(pwd):/backup \
  ubuntu tar czf /backup/piratebooty-backup-$(date +%Y%m%d).tar.gz /data

# Backup wallet
docker run --rm \
  -v piratebooty-wallet:/wallet \
  -v $(pwd):/backup \
  ubuntu tar czf /backup/wallet-backup-$(date +%Y%m%d).tar.gz /wallet
```

### Restore from Backup
```bash
# Restore blockchain
docker run --rm \
  -v piratebooty-data:/data \
  -v $(pwd):/backup \
  ubuntu tar xzf /backup/piratebooty-backup-20241222.tar.gz -C /

# Restore wallet
docker run --rm \
  -v piratebooty-wallet:/wallet \
  -v $(pwd):/backup \
  ubuntu tar xzf /backup/wallet-backup-20241222.tar.gz -C /
```

### Inspect Volumes
```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect piratebooty-data

# Remove unused volumes
docker volume prune
```

---

## Advanced Configuration

### Custom Daemon Options
```yaml
# docker-compose.override.yml
version: '3.8'

services:
  piratebootyd:
    command: >
      --p2p-bind-ip=0.0.0.0
      --p2p-bind-port=18080
      --rpc-bind-ip=0.0.0.0
      --rpc-bind-port=18081
      --confirm-external-bind
      --non-interactive
      --log-level=0
      --max-concurrency=8
      --add-priority-node=node1.piratebooty.io:18080
      --add-priority-node=node2.piratebooty.io:18080
      --out-peers=32
      --in-peers=128
```

### Mining Configuration
```yaml
services:
  piratebootyd:
    command: >
      --start-mining=PBT1YourAddressHere
      --mining-threads=4
      --bg-mining-enable
      --bg-mining-ignore-battery
```

### Resource Limits
```yaml
services:
  piratebootyd:
    deploy:
      resources:
        limits:
          cpus: '4.0'
          memory: 8G
        reservations:
          cpus: '2.0'
          memory: 4G
```

---

## Networking

### Port Mapping
- **18080** - P2P Network
- **18081** - RPC API
- **18082** - Wallet RPC
- **3000** - Explorer UI

### Firewall Configuration
```bash
# Allow P2P
sudo ufw allow 18080/tcp

# Allow RPC (only if needed externally)
sudo ufw allow 18081/tcp

# Check status
sudo ufw status
```

### External Access
```yaml
services:
  piratebootyd:
    ports:
      - "0.0.0.0:18080:18080"  # P2P (public)
      - "127.0.0.1:18081:18081"  # RPC (local only)
```

---

## Monitoring & Health Checks

### Health Check Script
```bash
#!/bin/bash
# health-check.sh

curl -s http://localhost:18081/get_info | jq .

if [ $? -eq 0 ]; then
  echo "✅ Daemon is healthy"
  exit 0
else
  echo "❌ Daemon is down"
  exit 1
fi
```

### Docker Health Check
```yaml
services:
  piratebootyd:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:18081/get_info"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
```

### Prometheus Monitoring
```yaml
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    depends_on:
      - prometheus
```

---

## Troubleshooting

### Common Issues

#### Container Won't Start
```bash
# Check logs
docker logs piratebooty-daemon

# Check container status
docker ps -a

# Inspect container
docker inspect piratebooty-daemon
```

#### Sync Issues
```bash
# Check sync status
docker exec piratebooty-daemon piratebootyd status

# Reset blockchain (⚠️ WARNING: Deletes data!)
docker-compose down -v
docker-compose up -d
```

#### Port Already in Use
```bash
# Find process using port
lsof -i :18080

# Or on Windows
netstat -ano | findstr :18080

# Change port in docker-compose.yml
ports:
  - "28080:18080"
```

#### Out of Disk Space
```bash
# Check disk usage
docker system df

# Clean up
docker system prune -a --volumes

# Check volume size
docker volume inspect piratebooty-data | grep Mountpoint
du -sh /var/lib/docker/volumes/piratebooty-data/_data
```

---

## Performance Tuning

### SSD Optimization
```yaml
services:
  piratebootyd:
    volumes:
      - type: volume
        source: piratebooty-data
        target: /home/pirate/.piratebooty
        volume:
          nocopy: true
    # Mount blockchain on SSD
    # /dev/sda1 -> /var/lib/docker/volumes
```

### RAM Disk for Faster Sync
```bash
# Create RAM disk (Linux)
sudo mkdir -p /mnt/ramdisk
sudo mount -t tmpfs -o size=8G tmpfs /mnt/ramdisk

# Mount in Docker
volumes:
  - /mnt/ramdisk:/home/pirate/.piratebooty/lmdb
```

### CPU Affinity
```yaml
services:
  piratebootyd:
    cpuset: "0-3"  # Use CPUs 0-3
```

---

## Security Best Practices

### 1. Don't Expose RPC Publicly
```yaml
ports:
  - "127.0.0.1:18081:18081"  # Local only
```

### 2. Use Secrets for Wallet Passwords
```yaml
secrets:
  wallet_password:
    file: ./secrets/wallet_password.txt

services:
  wallet-rpc:
    secrets:
      - wallet_password
```

### 3. Regular Backups
```bash
# Automated backup script
0 2 * * * /path/to/backup-script.sh
```

### 4. Update Regularly
```bash
# Pull latest changes
git pull origin main

# Rebuild
docker-compose up -d --build
```

### 5. Network Isolation
```yaml
networks:
  pirate-internal:
    internal: true
  pirate-external:

services:
  piratebootyd:
    networks:
      - pirate-internal
      - pirate-external
  wallet-rpc:
    networks:
      - pirate-internal
```

---

## Production Deployment

### Systemd Service
```ini
# /etc/systemd/system/piratebooty.service
[Unit]
Description=Pirate Booty Docker Compose
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/piratebooty
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start
sudo systemctl enable piratebooty
sudo systemctl start piratebooty

# Check status
sudo systemctl status piratebooty
```

### Logging
```yaml
services:
  piratebootyd:
    logging:
      driver: "json-file"
      options:
        max-size: "100m"
        max-file: "5"
```

### Restart Policy
```yaml
services:
  piratebootyd:
    restart: unless-stopped
    deploy:
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
```

---

## Multi-Node Setup

### Seed Node
```yaml
# docker-compose.seed.yml
services:
  piratebootyd-seed:
    build: .
    ports:
      - "18080:18080"
    command: >
      --p2p-bind-ip=0.0.0.0
      --p2p-bind-port=18080
      --rpc-bind-ip=0.0.0.0
      --rpc-bind-port=18081
      --seed-node
```

### Full Node
```yaml
# docker-compose.node.yml
services:
  piratebootyd:
    build: .
    command: >
      --add-priority-node=seed.piratebooty.io:18080
```

---

## CI/CD Integration

### GitHub Actions
```yaml
# .github/workflows/docker.yml
name: Docker Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build Docker image
        run: docker build -t piratebooty:${{ github.sha }} .
      
      - name: Run tests
        run: docker run piratebooty:${{ github.sha }} piratebootyd --help
      
      - name: Push to registry
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker push piratebooty:${{ github.sha }}
```

---

## Support

### Getting Help
- Documentation: https://docs.piratebooty.io
- GitHub Issues: https://github.com/piratebooty/piratebooty/issues
- Discord: https://discord.gg/piratebooty
- Reddit: https://reddit.com/r/piratebooty

### Useful Commands
```bash
# Container shell access
docker exec -it piratebooty-daemon /bin/bash

# Check daemon status
docker exec piratebooty-daemon piratebootyd status

# View blockchain info
docker exec piratebooty-daemon piratebootyd print_bc

# Sync status
docker exec piratebooty-daemon piratebootyd print_cn

# Get height
docker exec piratebooty-daemon piratebootyd print_height
```

🏴‍☠️ **Happy Mining, Matey!**
