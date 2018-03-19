# WLAN
Should connect automatically. If not, use the commands below.

## How to connect

$ sudo systemctl status wpa_supplicant@wlan0.service

$ sudo wpa_supplicant -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf

If the above command fails -->

$ wpa_cli terminate

$ sudo wpa_supplicant -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf

## How to edit connections

sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

# Multiple Consoles
How to work with multiple consoles via ssh.

## Screen
$ screen | starts screen

$ screen -s [name] | start new session

ctrl + a + space | switch between sessions
