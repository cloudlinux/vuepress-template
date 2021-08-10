# Installation Guide

[[toc]]

## Requirements

**Operating system**

* CentOS/RHEL 6,7,8
* CloudLinux OS 6,7,8
* Ubuntu 16.04 (LTS only), 18.04 and 20.04 
* Debian 9 and 10


**Virtualization**

<span class="notranslate">OpenVZ</span> - works for <span class="notranslate">Virtuozzo</span> 7 with kernel 3.10.0-327.10.1.vz7.12.8 or newer.

**Hardware**

* <span class="notranslate">RAM: 1Gb</span>
* <span class="notranslate">HDD: 20Gb</span> available disk space

**Supported hosting panels**

* <span class="notranslate">cPanel</span>
* <span class="notranslate">Plesk (Plesk</span> 17.5 or newer)
* <span class="notranslate">DirectAdmin</span>
* <span class="notranslate">CyberPanel</span> (only CloudLinux OS 7 and 8). See [3rd party integration guide from CyberPanel](https://cyberpanel.net/docs/how-to-install-and-use-imunify360-on-cyberpanel/).
* [No hosting panel systems](/stand_alone/)

**Required browsers**

* <span class="notranslate">Safari</span> version 10 or later
* <span class="notranslate">Chrome</span> version 39 or later
* <span class="notranslate">Firefox</span> version 28 or later
* <span class="notranslate">Edge</span> version 17 or later

**Supported Web-servers**
* <span class="notranslate">Apache</span>
* <span class="notranslate">LiteSpeed</span>
* Nginx ([only in Standalone mode](/stand_alone/))


## Side by side installation with another <span class="notranslate">IDS</span>

**Compatible**

| | |
|-|-|
|**<span class="notranslate">IDS</span> name**| **Comment**|
|<span class="notranslate">LiteSpeed</span> | Integrates with version 5.1 or higher.|
|<span class="notranslate">EasyApache3</span> | Works only in cPanel.|
|<span class="notranslate">EasyApache4</span> | Works only in cPanel.|
|<span class="notranslate">CSF</span> | Integrated with <span class="notranslate">CSF</span>, more details [here](/ids_integration/#csf-integration).|
|<span class="notranslate">CWAF Agent</span> | No problems detected.|
|<span class="notranslate">Patchman</span> | No problems detected.|
|<span class="notranslate">Suhosin</span> | We are ignoring alerts by <span class="notranslate">Suhosin</span>.|
|<span class="notranslate">Cloudflare</span> | Imunify360 supports graylisting IP addresses behind <span class="notranslate">Cloudflare</span>. More details [here](/ids_integration/#cloudflare-support).|
|<span class="notranslate">CXS</span> | [Special actions required](/ids_integration/#cxs-integration) to use Imunify360 with <span class="notranslate">CXS</span> installed.|
|<span class="notranslate">cPHulk</span> | Imunify360 disables <span class="notranslate">cPHulk</span> during installation. However in case of enabling it back, Imunify360 integrates with it and shows <span class="notranslate">cPHulk</span> events in the incident screen.|
|<span class="notranslate">OpenVZ</span> | Works for <span class="notranslate">Virtuozzo</span> 7 with kernel 3.10.0-327.10.1.vz7.12.8 or later.|
|<span class="notranslate">UptimeRobot</span>| No problems detected.|

**Incompatible**

| | |
|-|-|
|**<span class="notranslate">IDS</span> name** | **Comment**|
|<span class="notranslate">ASL (Atomicorp Secured Linux)</span> | Possibly is not compatible (investigating).|
|<span class="notranslate">fail2ban</span> | Imunify360 disables <span class="notranslate">fail2ban</span>: the latter resets chains of iptables rules which causes inconsistency with Imunify360|

## Installation Instructions

:::warning Warning
On DirectAdmin, Imunify UI requires the <span class="notranslate">`proc_open`</span> PHP function to be enabled. If you are unable to open the Imunify UI, you might see a related message in the web server error log. If so, please remove it from the <span class="notranslate">`disable_functions`</span> list in <span class="notranslate">`php.ini`</span>.
:::

1. Get your license key at [https://www.imunify360.com/](https://www.imunify360.com/). You can purchase it or get a trial key from a received email.


2. Setup or install the prerequisites required for your environment if any.
   * [cPanel  hosting panel](/hosting_panels_specific_settin/#cpanel)
   * [Plesk hosting panel](/hosting_panels_specific_settin/#plesk)
   * [Stand-alone version (no hosting panel)](/stand_alone/)
   * On  <span class="notranslate">Debian 10</span>, enable  <span class="notranslate">`buster-backports`<span>:
<div class="notranslate">

```
echo "deb http://ftp.debian.org/debian buster-backports main" > /etc/apt/sources.list.d/backports.list
apt-get update
```

</div>

:::warning Warning
For Plesk users: it is recommended to disable backports repository after Imunify360 installation as it isn't fully supported on Plesk servers.
:::

3. Log in with root privileges to the server where Imunify360 should be installed.

4. Go to your home directory and run the commands:

<div class="notranslate">

```
wget https://repo.imunify360.cloudlinux.com/defence360/i360deploy.sh -O i360deploy.sh
```

</div>
<div class="notranslate">

```
bash i360deploy.sh --key YOUR_KEY
```

</div>

where <span class="notranslate">`YOUR_KEY`</span> is your license key. Replace <span class="notranslate">`YOUR_KEY `</span> with the actual key - trial or purchased at [https://www.imunify360.com/](https://www.imunify360.com/) .

To install Imunify360 beta version add argument <span class="notranslate">`--beta`</span> . For example:

<div class="notranslate">

```
bash i360deploy.sh --key YOUR_KEY --beta
```

</div>

where <span class="notranslate">`YOUR_KEY`</span> is your license key. Replace <span class="notranslate">`YOUR_KEY `</span> with the actual key - trial or purchased at [https://www.imunify360.com/](https://www.imunify360.com/).

If you have an IP-based license, run the same script with no arguments:

<div class="notranslate">

```
wget https://repo.imunify360.cloudlinux.com/defence360/i360deploy.sh -O i360deploy.sh
```

</div>
<div class="notranslate">

```
bash i360deploy.sh
```

</div>

To view available options for installation script run:

<div class="notranslate">

```
bash i360deploy.sh -h
```

</div>

### Registering

In a case of registration key is passed later, then you can register an activation key via the <span class="notranslate">Imunify360-agent</span> command:

<div class="notranslate">

```
imunify360-agent register YOUR_KEY
```

</div>

Where <span class="notranslate">`YOUR_KEY`</span> is your activation key.


If you have IP-based license, you can use the following command:

<div class="notranslate">

```
imunify360-agent register IPL
```

</div>

### SELinux support

If SELinux (Security-Enhanced Linux) is enabled on your server, you should install the Imunify360 SELinux policy module. You can check SELinux status by `sestatus` command. Policy is shipped with Imunify360 package and is located in the <span class="notranslate">`/opt/alt/python38/share/imunify360/imunify360.te`</span>

To apply it, run the following commands:

<div class="notranslate">

```
checkmodule -M -m -o /var/imunify360/imunify360.mod /opt/alt/python38/share/imunify360/imunify360.te
semodule_package -o /var/imunify360/imunify360.pp -m /var/imunify360/imunify360.mod
semodule -i /var/imunify360/imunify360.pp
```
</div>

After that, restart imunify360 and imunify360-webshield service.
For CentOS6/CloudLinux6:
<div class="notranslate">

```
service imunify360 restart
service imunify360-webshield restart
```

</div>

For other systems:

<div class="notranslate">

```
systemctl restart imunify360
systemctl restart imunify360-webshield
```
</div>

If <i>checkmodule</i> command is not found, please, install it:
For CentOS8/CloudLinux 8:

<div class="notranslate">

```
yum install policycoreutils-python-utils
```

</div>

## Update Instructions

:::tip Note
Updates are unconditionally enabled and the Imunify360 service starts during the package update.
:::


To upgrade Imunify360, run the command:

<div class="notranslate">

```
yum update imunify360-firewall
```

</div>

To update Imunify360 beta version, run the command:

<div class="notranslate">

```
yum update imunify360-firewall --enablerepo=imunify360-testing
```

</div>

To update Imunify360 on <span class="notranslate">Ubuntu/Debian</span>, run the command:

<div class="notranslate">

```
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

</div>

To update Imunify360 **beta** version on <span class="notranslate">Ubuntu 16.04</span>, run the command:

<div class="notranslate">

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/ubuntu-testing/16.04/ xenial main'  > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

</div>


To update Imunify360 **beta** version on <span class="notranslate">Ubuntu 18.04</span>, run the command:

<div class="notranslate">

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/ubuntu-testing/18.04/ bionic main'  > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

</div>

To update Imunify360 **beta** version on <span class="notranslate">Debian</span>, run the command:

<div class="notranslate">

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/debian-testing/10/ buster main'  > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

</div>


If you do not want to receive updates from <span class="notranslate">beta</span>, remove <span class="notranslate">beta</span> repository:

<div class="notranslate">

```
rm /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
```

</div>


### Gradual roll-out

New stable Imunify360 versions are scheduled for the gradual roll-out from our production repository and are available for all customers in about two weeks or less from the release.

If you do not want to wait for the gradual roll-out, you can update Imunify360 to the latest version by running the following commands:

<div class="notranslate">

```
wget https://repo.imunify360.cloudlinux.com/defence360/imunify-force-update.sh
bash imunify-force-update.sh
```
</div>
