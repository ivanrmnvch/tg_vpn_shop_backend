#!/bin/sh

# default log files
echo "" > ../logs/xray/access.log
echo "" > ../logs/xray/error.log

# default xray config
echo '{
  "log": {
    "loglevel": "info"
  },
  "routing": {
    "rules": [],
    "domainStrategy": "AsIs"
  },
  "inbounds": [
    {
      "port": 443,
      "protocol": "vless",
      "tag": "vless_tls",
      "settings": {
        "clients": [
          {
            "id": "f3a7efcc-2aa1-4eb7-bd16-bdb5c3153ba4",
            "email": "test@test.com",
            "flow": "xtls-rprx-vision"
          }
        ],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
    "realitySettings": {
      "show": false,
      "dest": "www.microsoft.com:443",
      "xver": 0,
      "serverNames": [
        "www.microsoft.com"
      ],
      "privateKey": "OLuCQ6jSumfdjfRNFUj5VmyObEshi3dgMz1tUT66qCg",
      "minClientVer": "",
      "maxClientVer": "",
      "maxTimeDiff": 0,
      "shortIds": [
        "bf4ce2edf5e4ab61"
      ]
    }
      },
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls"
        ]
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "tag": "block"
    }
  ]
}' > ../config/xray/config.json
