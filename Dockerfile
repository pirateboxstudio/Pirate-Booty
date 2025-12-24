# 🏴‍☠️ Pirate Booty - Multi-stage Docker Build
# Builds the Pirate Booty daemon and wallet

# Builder stage
FROM ubuntu:22.04 AS builder

ENV DEBIAN_FRONTEND=noninteractive

RUN set -ex && \
    apt-get update && \
    apt-get --no-install-recommends --yes install \
        build-essential \
        ca-certificates \
        cmake \
        curl \
        git \
        pkg-config \
        libboost-all-dev \
        libssl-dev \
        libzmq3-dev \
        libunbound-dev \
        libsodium-dev \
        libunwind8-dev \
        liblzma-dev \
        libreadline-dev \
        libexpat1-dev \
        libpgm-dev \
        libhidapi-dev \
        libusb-1.0-0-dev \
        libprotobuf-dev \
        protobuf-compiler \
        libudev-dev

WORKDIR /src
COPY . .

ARG NPROC
RUN set -ex && \
    git submodule init && git submodule update --recursive && \
    rm -rf build && \
    mkdir -p build && cd build && \
    cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_GUI_DEPS=OFF && \
    if [ -z "$NPROC" ] ; \
    then make -j$(nproc) ; \
    else make -j$NPROC ; \
    fi

# Runtime stage
FROM ubuntu:22.04

RUN set -ex && \
    apt-get update && \
    apt-get --no-install-recommends --yes install \
        ca-certificates \
        libboost-system1.74.0 \
        libboost-filesystem1.74.0 \
        libboost-thread1.74.0 \
        libboost-program-options1.74.0 \
        libssl3 \
        libzmq5 \
        libunbound8 \
        libsodium23 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /src/build/bin/* /usr/local/bin/

# 🏴‍☠️ Create pirate user (ahoy!)
RUN adduser --system --group --disabled-password pirate && \
	mkdir -p /wallet /home/pirate/.piratebooty && \
	chown -R pirate:pirate /home/pirate/.piratebooty && \
	chown -R pirate:pirate /wallet

# Contains the blockchain (treasure map!)
VOLUME /home/pirate/.piratebooty

# Generate your wallet via:
# docker exec -it piratebooty pirate-wallet-cli
VOLUME /wallet

# P2P and RPC ports
EXPOSE 18080
EXPOSE 18081

# Switch to pirate user
USER pirate

ENTRYPOINT ["piratebootyd"]
CMD ["--p2p-bind-ip=0.0.0.0", "--p2p-bind-port=18080", "--rpc-bind-ip=0.0.0.0", "--rpc-bind-port=18081", "--non-interactive", "--confirm-external-bind"]

