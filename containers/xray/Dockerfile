FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y init curl unzip && \
    curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh | bash && \
    apt purge -y curl unzip && \
    apt autoremove -y

WORKDIR /usr/local/etc/xray

CMD ["/usr/local/bin/xray", "run", "-config", "config.json"]
