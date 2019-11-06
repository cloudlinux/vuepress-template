# Command-line Interface


For access to Imunify360 agent features from command-line interface, use the following command:

```
imunify360-agent
```

Optional arguments:

| | |
|-------|-|
| `-h, --help`| Returns the help message|
| `--console-log-level [ERROR,WARNING,INFO,DEBUG]`| Level of logging input to the console|

Basic usage:

```
imunify360-agent [command] [--option1] [--option2]...
```

Available commands:
| | |
|-|-|
|`3rdparty`|Make Imunify360 the primary IDS|
|`blacklist`|Return/Edit IP blacklist|
|`blocked-port`|Return/Edit list of blocked ports|
|`check-domains`|Send domain list check|
|`clean`|Clean the incidents|
|`checkdb`|Check database integrity|
|`doctor`|Collect info about system and send it to CloudLinux|
|`features`|Manage available features for Imunify360|
|`get`|Returns list of incidents|
|`graylist`|Return/Edit IP Gray List|
|`import`|Import data|
|`infected-domains`|Returns infected domain list|
|`malware`|Allows to manage malware options|
|`migratedb`|Check and repair database if it is corrupted|
|`plugins`|Command for manipulating Imunify360 plugin|
|`register`|Agent registration|
|`rstatus`|Query the server to check if the license is valid|
|`rules`|Allows user to manage disabled rules|
|`unregister`|Unregistration the agent|
|`vendors`|Command for manipulating Imunify360 vendors|
|`version`|Show version|
|`whitelist`|Return/Edit operator for IP and domain white list|
|`proactive`<sup>3.7.0+</sup>|Allows to manage Proactive Defense feature|

Optional arguments for the commands:

| | |
|-----------|-|
|`-h, --help`|Shows this help message.|
|`--json`|Returns data in JSON format.|
|`--by-country-code [country_code]`|Filters output by country code.<br>Requires valid country code as argument.<br> Find valid country codes [here](https://www.nationsonline.org/oneworld/country_code_list.htm) in column ISO ALPHA-2 CODE.|
|`--by-ip [ip_address]`|Filters output by abuser's IP or by subnet in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#IPv4_CIDR_blocks).<br>Example: `--by-ip 1.2.3.0/24`.|
|`--by-list`|Can be:<br><ul><li>any</li><li>gray (Gray List)</li><li>white (White List)</li><li>black (Black List)</li></ul>Filters output based on the list type.<br>Example: `--by-list black`.|
|`--limit`|limits the output with specified number of incidents.<br>Must be a number greater than zero. By default, equals 100.|
|`--offset`|Offset for pagination. By default, equals 0.|
|`--to`|Allows to set the end of the period for filter.<br>Format is a timestamp.|
|`--manual-only`|Show only IP’s that have been added manually.|
|`--no-manual-only`|Show IP’s that have been added both automatically<br>and manually.|
|`--verbose, -v`|Allows to return data in good-looking view if<br>option `--json` is used.|
 
## 3rdparty

Command for disabling 3rd party IDS (currently they are cPHulk and fail2ban) and make Imunify360 agent the primary IDS.

Usage:

```
imunify360-agent 3rdparty [-h]
```

`command` is a positional argument and can be:

| | |
|-|-|
| `conflicts`| Show conflicts with other software|
| `list`| List other IDS that might be running concurrently with Imunify360|

Optional arguments:

| | |
|-|-|
| `-h, --help`| Show this help message|
 
## Blacklist

This command allows to view or edit actual IPs in the blacklist.

Usage:

```
imunify360-agent blacklist [subject] [command] <value> [--option]
```

`subject ` is a positional argument and can be:

| | |
|-|-|
| `country`| Allows to manipulate with countries in the Black List|
| `ip`| Allows to manipulate with IPs in the Black List|

`command` is a second positional argument and can be:

| | |
|-|-|
| `add`| add item(-s) to Black List|
| `delete`| remove item(-s) from Black List|
| `move`| move item(-s) to Black List|
| `edit`| edit comment on item in the Black List|
|`list` | list items(-s) in Black List|


Please note that by default `list` command outputs only first 100 items in the list as if it was run as `blacklist ip list --limit 100` .
To check whether specific IP address is in the list, you can run the following command:

```
blacklist ip list --by-ip 12.34.56.78
```

where 12.34.56.78 is that specific IP address.

`value` is an item to manipulate with. It can be IP itself or a country code (find necessary country codes here in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#IPv4_CIDR_blocks) in the column ISO ALPHA-2 CODE).

`option` can be one or few of the optional arguments specified above and one more:

| | |
|-|-|
| `--comment`| allows to add comment to the item|

**Examples:**

* The following command adds IP 1.2.3.4 to the Black List with a comment “one bad IP”:

   ```
   imunify360-agent blacklist ip add 1.2.3.4 --comment “one bad ip”
   ```

* The following command returns a list of IPs in the Black List which are from Bolivia:

   ```
   imunify360-agent blacklist --by-country-code BO
   ```

 
## Blocked ports

This command allows to view or edit ports, IPs, and protocols in the list of blocked ports.

Usage:

```
imunify360-agent blocked-port [command] <value> [--option]
```

`command` is a first positional argument and can be:

| | |
|-|-|
|`add`|add item(-s) to blocked ports|
| `delete`|remove item(-s) from blocked ports|
| `edit`|edit comment on item in the blocked ports|
| `list`|list items(-s) in blocked ports|

`value` is an item to manipulate with. `value ` is `:` separated pair of port number and protocol: `5432:tcp`, `28:udp`

`option` can be one or few of the optional arguments specified above and some more:

| | |
|-----|-|
| `--comment`| allows to add comment to the item|
|`--ips`| allows to add IP addresses to ignore list of the<br>blocked port (port won’t be blocked for this IP addresses)|

**Example:**

The following command blocks port 5555 for tcp connections with a comment “Some comment”:

```
imunify360-agent blocked-port add 5555:tcp --comment “Some comment”
```
 
## Check-domains

Allows to send domains list to check on Imunify360 central server. This command requires cPanel. After domains checked, the results is available via command `infected-domains`.

::: tip Note
The server requires some time for checking and the results may not be ready immediately.
:::
Usage:

```
imunify360-agent check-domains [--optional arguments]
```

Optional arguments:

| | |
|-|-|
|`-h, --help`|show this help message|
|`--json`|return data in JSON format|
|`--verbose, -v`|allows to return data in good-looking view if option `--json` is used|

## Clean

Clean the incident list.

Usage:

```
imunify360-agent clean [--optional arguments]
```

Optional arguments:

| | |
|-|-|
|`-h, --help`|show this help message|
|`--json`|return data in JSON format|
|`--days`|cleanups incidents from database, if there are more than specified days quantity<br>Example: `--days 5`.<br>this option will cause deletion of all incidents that are older than 5 days from today|
|`--limi|`|leaves only limited number of the incidents in the database and deletes the others<br>Example: `--limit 5000`.<br>this option will leave only 5000 new incidents and delete the others|

## Checkdb

Checks database integrity. In case database is corrupt, then this command saves backup copy of the database at `/var/imunify360` and tries to restore integrity of the original database. Note that if this command cannot restore database integrity, then it will destroy the original broken database. Use `migratedb` command to create new clean database.

Usage:

```
imunify360-agent checkdb [-h]
```

Optional arguments:

| | |
|-|-|
|`-h, --help`|Show this help message.|
|`--json`|Return data in JSON format.|
|`--verbose, -v`|Allows to return data in good-looking view if option `--json` is used.|


## Doctor

Collecting information about Imunify360 state, generating the report and sending it to Imunify360 Support Team. This command can be used in case of any troubles or issues with Imunify360. This command will generate a key to be sent to Imunify360 Support Team. With that key Imunify360 Support Team can help with any problem as fast as possible.

Usage:

```
imunify360-agent doctor [-h]
```
Optional arguments:

| | |
|-|-|
|`-h, --help`|Show this help message.|
|`--json`|Return data in JSON format.|
|`--verbose, -v`|Allows to return data in good-looking view if option `--json` is used.|
 
## Features

Allows to enable or disable additional CloudLinux software included in Imunify360 for free. The following software is available:

* [KernelCare](https://www.kernelcare.com)
* [HardenedPHP](https://www.cloudlinux.com/hardenedphp)
* Invisible Captcha

Usage:

```
imunify360-agent features [-h] [command] <feature name>
```

`command` is a positional arguments and can be :

| | |
|-|-|
|`install`|allows to enable software|
|`remove`|allows to disable software|
|`status`|allows to check the status of the software|
|`list`|allows to list all available software|

Optional arguments:

| | |
|-|-|
|`-h, --help`|show this help message|

**Examples:**

1. The following command checks if KernelCare is installed:

   ```
   imunify360-agent features status kernelcare
   ```

2. The following command installs KernelCare:

   ```
   imunify360-agent features install kernelcare
   ```

3. The following command uninstalls KernelCare:

   ```
   imunify360-agent features remove kernelcare
   ```


## Get

The command returns the lists of incidents.

Usage:

```
imunify360-agent get [--required argument] [--optional argument]...
```

Option can be one or few of the optional arguments listed above and one more.

| | |
|-|-|
|`--order-by [ORDER_BY [ORDER_BY ...]]` |Sorting order.|
|`--limit`|Limits the output with specified number of IPs.<br>Must be a number greater than zero. By default, equals 100.|
|`--by-country-code [country_code]`|Filters output by country code.<br>Requires valid country code as argument.<br>Find valid country codes<br>in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#IPv4_CIDR_blocks) in column ISO ALPHA-2 CODE.|
|`--period [period]`|Timeframe.<br>Allows to specify the amount of time starting from the current day.<br>Should be greater than (or equal to) 1 minute.<br>Can be specified in format:<ul><li>`<int>m` – minutes, example ` --period 30m`</li><li>`<int>h` – hours, example `--period 4h`</li><li>`<int>d` – days, example `--period 7d`</li><li>`today` – for today, example `--period today`</li><li>`yesterday` – for yesterday, example `--period yesterday`</li></ul>For example, ` --period 5d` will return a list of incidents for 5 days. |
|`--since [timestamp]`|allows to set start time to filter the list of incidents by period|
|`--to [timestamp]`|allows to set finish time to filter the list of incidents by period|
|`--severity`|allows to set severity to filter the list of incidents|
|`--offset OFFSET`|	Offset for pagination. By default, equals 0|
|`--by-abuser-ip [BY_ABUSER_IP]`| selection based on abuser IP address|
|`--json`| return data in JSON format |
|`--search`|string to search incidents by|
|`--by-list`|Can be:<br><ul><li>any</li><li>gray (Gray List)</li><li>white (White List)</li><li>black (Black List)</li></ul>Filters output based on the list type.<br>Example: `--by-list black`.|

_Example:_

The following command shows the incidents (in JSON format) for recent one hour, filtered by country code UA and filtered by Black List IPs:

```
imunify360-agent get --period 1h --by-country-code UA --by-list black --json
```

## Graylist

This command allows to view or edit actual IP blacklist.

Usage:
```
imunify360-agent graylist ip [command] [--optional argument]
```

Available commands:

| | |
|-|-|
|`delete`|allows to remove IP from Gray List|
|`list`|allows to list IPs in Gray List|

Optional arguments:

| | |
|-|-|
|`-h, --help`|show this help message|

Optional arguments for `list` :

| | |
|-|-|
|`--json`|Returns data in JSON format.|
|`--by-country-code [country_code]`|Filters output by country code.<br>Requires valid country code as argument.<br>Find valid country codes<br>in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#IPv4_CIDR_blocks) in column ISO ALPHA-2 CODE.|
|`--by-ip [ip_address]`|Filters output by abuser's IP or by subnet in CIDR notation.<br>Example: `--by-ip 1.2.3.0/24`|
|`--limit`|Limits the output with specified number of IPs.<br>Must be a number greater than zero. By default, equals 100.|
|`--offset`|Offset for pagination. By default, equals 0.|
|`--verbose, -v`|Allows to return data in good-looking view<br>if option `--json` is used.|

Please note that by default `list` command outputs only first 100 items in the list as if it was run as `graylist ip list --limit 100`.
To check whether specific IP address is in the list, you can run the following command:

```
graylist ip list --by-ip 12.34.56.78
```

where `12.34.56.78` is that specific IP address.

**Example:**

The following command will remove IP `1.2.3.4` from the Gray List:

```
imunify360-agent graylist ip delete 1.2.3.4
```

## Import

This command allows to import Black and White lists from the other 3rd party IDS (only CSF supported at the moment) to Imunify360 database.
Note. If CSF is enabled, then it is not necessary to run the command because Imunify360 is integrated with CSF.

Usage:

```
imunify360-agent import [-h] {blocked-ports, wblist} ...
```

Positional arguments:

| | |
|-|-|
|`blocked-ports`|Import blocked-ports from other IDS|
|`wblist`|Import White/Black List from other IDS|

Optional arguments:

| | |
|-|-|
|`-h, --help`|Show this help message|

**Example:**

The following command will import Black and White Lists from the 3rd party IDS:

```
imunify360-agent import wblist
```
## Infected-domains

Allows to retrieve infected domains list.

Usage:

```
imunify360-agent infected-domains [-h] [--optional arguments]
```
Optional arguments for ` list`:

| | |
|-|-|
|`--json`|Returns data in JSON format.|
|`--limit `|Limits the output with the specified number of domains.<br>Must be a number greater than zero. By default, equals 100.|
|`--offset`|Offset for pagination. By default, equals 0.|
|`--verbose, -v`|Allows to return data in a good-looking view if option `--json` is used.|
 
## Malware

Allows to manage malware options.

Usage:

```
imunify360-agent malware [-h] [--optional arguments]
```
Available commands:

| | |
|-|-|
|`dashboard indicators`|Show indicators for dashboard.|
|`ignore`|Allows to add, delete or show files which will not be scanned.|
|`malicious`|Allows to manage malicious files.|
|`on-demand`|Allows to manage on-demand scanner.|
|`read`|Allows to read malware files.|
|`suspicious`|Allows to manage suspicious files.|
 
Optional arguments:

| | |
|-|-|
|`-h, --help`|Show this help message.|
|`--json`|Returns data in JSON format.|
|`--limit `|Limits the output with the specified number of domains.<br>Must be a number greater than zero. By default, equals 100.|
|`--offset`|Offset for pagination. By default, equals 0.|
|`--verbose, -v`|Allows to return data in a good-looking view if option `--json` is used.|
|`--since SINCE`|Start date.|
|`--to TO`|End date.|
|`--user USER`|Returns results for a chosen user.|

`command` is a second positional argument for `ignore ` and can be:

| | |
|-|-|
|`add`|Add a file or files divided by space to the ignore list.|
|`delete`|Delete an ignored file or files divided by space from the list.|
|`list`|Show a list of ignored files.|
 
`command` is a second positional argument for `malicious` and can be:

| | |
|-|-|
|`delete`|Delete malicious file or files divided by space.|
|`list`|Show a list of malicious files.|
|`move-to-ignore `|Move a file or files divided by space to the ignore list.|
|`quarantine-malicious`|Allows to add malicious files to quarantine.|
|`restore-from-backup`|Restore source files from backup.|
|`restore-from-quarantine`|Restore files from quarantine.|

`command` is a second positional argument for `on-demand` and can be:

| | |
|-|-|
|`start`|Start on-demand scanner for the path specified after the `start` command.<br>For example: `imunify360-agent malware on-demand start --path /home/<username>/public_html/`|
|`list`|Returns a list of all on-demand scanner session results.|
|`status`|Show current status for on-demand scanner.|
|`stop`|Stop current scanning.|

`command` is a second positional argument for `suspicious` and can be:

| | |
|-|-|
|`delete`|Delete suspicious file or files divided by space.|
|`list`|Show a list of suspicious files.|
|`move-to-ignore`|Move suspicious files divided by space to the ignore list.|
|`move-to-quarantine`|Move suspicious files divided by space to the quarantine|
 
## Migratedb

Allows to create clean database if it was corrupted.

::: tip Note
Use `checkdb` to check database health.
:::

Usage:

```
Imunify360-agent migratedb [-h]
```

Optional arguments:

| | |
|-|-|
|`--help, -h`|show this help message|


## Plugins

Command for manipulating Imunify360 plugins.

Usage:

```
imunify360-agent [command]
```

`command` is a positional argument and can be:

| | |
|-|-|
|`enable-plugin`|Enable Imunify360 plugin.|
|`disable-plugin`|Disable Imunify360 plugin.|

Optional arguments:

| | |
|-|-|
|`-h, --help`|Show this help message.|
|`--json`|Return data in JSON format.|
|`--verbose, -v`|Return data in good-looking view if option `--json` is used.|

 
## Register

Allows to register and activate Imunify360. You can use it in case if Imunify360 was not activated during installation process or in case if activation key of the Imunify360 was changed for any reason. If you do not know what is an activation key or have any problem with it then, please, read [Installation guide](/installation/) or contact our [support team](https://cloudlinux.zendesk.com/hc/requests/new).

Usage:

```
imunify360-agent register [--optional arguments] [KEY]
```

`KEY` is a positional argument:

| | |
|-|-|
|`KEY`|Register with activation key (use `IPL` to register by IP).|

If you will use this command without the `KEY` argument, then it will try to register and activate current activation key.

Optional arguments:

| | |
|-|-|
|`-h, --help`|Show this help message.|
|`--json`|Return data in JSON format.|
|`--verbose, -v`|Allows to return data in good-looking view if option `--json` is used.|

**Example 1:**

The following command will register and activate Imunify360 with the provided activation key:

```
imunify360-agent register IM250sdfkKK245kJHIL
```

**Example 2:**

If you have an IP-based license, you can use `IPL` argument to register and activate Imunify360:

```
imunify360-agent register IPL
```
## Rstatus

Allows to check if Imunify360 server license is valid.

Usage:

```
imunify360-agent rstatus [--optional arguments]
```

Optional arguments:

| | |
|-|-|
|`-h, --help`|Show this help message.|
|`-json`|Return data in JSON format.|
|`--verbose, -v`|Allows to return data in good-looking view if option `--json` is used.|

## Rules

This command allows user to manage rules disabled for firewall plugins Imunify360 uses.

Usage:

```
imunify360-agent rules [command] [--option] <value> [--option] <value>
```

`command` is a positional argument and can be:

| | |
|-|-|
|`disable`|Add a new rule to the disabled rules list.|
|`enable`|Remove a rule from the disabled rules list.|
|`list-disabled`|Display the list of the disabled rules.|

Option can be:

| | |
|-|-|
|`--id`|ID number of the rule provided by the firewall plugin.|
|`--plugin`|Firewall plugin name. Can be one of the following:<ul><li>`modsec` for ModSecurity</li><li>`ossec` for OSSEC</li></ul>|
|`--name`|Name of the added rule or details of the rule from ModSecurity or OSSEC.|

**Examples**
1. The following command adds a rule with id 42 and name ‘Rule name’ for the ModSecurity rules to the disabled rules list:

   ```
   imunify360-agent rules disable --id 42 --plugin modsec --name 'Rule name'
   ```

2. The following command removes a rule with id 42 for the ModSecurity rules from the disabled rules list:

   ```
   imunify360-agent rules enable --id 42 --plugin modsec
   ```

3. The following command displays the list of disabled rules:

   ```
   imunify360-agent rules list-disabled
   ```

   The list is displayed as follows:

   ``` Python
   {'plugin': 'modsec', 'id': '214920', 'domains': ['captchatest.com'], 'name': 'Imported from config'}

   {'plugin': 'modsec', 'id': '42', 'domains': None, 'name': 'Rule name'}

   {'plugin': 'ossec', 'id': '1003', 'domains': None, 'name': 'Imported from config'}

   {'plugin': 'ossec', 'id': '2502', 'domains': None, 'name': 'User missed the password more than one time'}
   ```

   Where
   * plugin — is a firewall plugin name (modsec for ModSecurity and ossec for OSSEC)
   * id — is id number of the rule provided by the firewall plugin
   * domains — the list of the domains for which the rule is disabled (None means all domains)*
   * name — rule description or details of the rule from ModSecurity or OSSEC

   ::: tip Note
   Domains are specified only for ModSecurity rules. For OSSEC rules it is always applies to all domains.
   :::
 
## Unregister

Allows to unregister and disable Imunify360 on the server. 

::: tip Note
To remove Imunify360 from the server it needs to be [uninstalled](/uninstall/).
:::

Usage:

```
imunify360-agent unregister [--optional arguments]
```

Optional arguments:

| | |
|-|-|
|`-h, --help`|Show this help message.|
|`--json`|Return data in JSON format.|
|`--verbose, -v`|Allows to return data in good-looking view if option `--json` is used.|

## Vendors

Command for manipulating Imunify360 vendors.

Usage:

```
imunify360-agent [command]
```

`command` is a positional argument and can be:

| | |
|-|-|
|`install-vendors`|Install ModSecurity vendors.<br>This command will install Imunify360 vendor and<br>[Comodo WAF](https://modsecurity.comodo.com/) if there are no conflicts with other installed vendors.|
|`uninstall-vendors`|uninstall ModSecurity vendors.|

Optional arguments:

| | |
|-|-|
|`-h, --help`|Show this help message.|
|`--json`|Return data in JSON format.|
|`--verbose, -v`|Return data in good-looking view if option `--json` is used.|

## Version

Allows to view the actual Imunify360 version installed on the server.

Usage:

```
imunify360-agent version [-h] [--json]
```

Optional arguments:

| | |
|-|-|
|`-h, --help`|Show this help message.|
|`--json`|Return data in JSON format.|
|`--verbose, -v`|Allows to return data in good-looking view if option `--json` is used.|

## Submit false positive or false negative to Imunify360 team for analysis

To submit file as false positive (if Imunify360 considers file as a malicious but it actually doesn’t) you can use the following command:

```
imunify360-agent submit false-positive <file>
```

To submit file as false negative (if Imunify360 considers file as a non-malicious but it actually does) you can use the following command:

```
imunify360-agent submit false-negative <file>
```

Optional arguments:

| | |
|-|-|
|`--to`|Email to send.|
|`--sender`|User email.|
|`-h, --help`|Show this help message|
|`--json`|Return data in JSON format.|
|`--verbose, -v`|Allows to return data in good-looking view if option `--json` is used.|
 
## Whitelist 

This command allows to view or edit actual IPs and domains in the Whitelist.

Usage:

```
imunify360-agent whitelist [subject] [command] <value> [--option]
```

`subject` is a positional argument and can be:

| | |
|-|-|
|`ip`|Allows to manipulate with IPs in the White List.|
|`domain`|Allows to manipulate with domains in the White List.|

`command` is a second positional argument and can be:

| | |
|-|-|
|`add`|Add item(-s) to the White List.|
|`delete`|Remove item(-s) from the White List.|
|`move`|Move item(-s) to the White List.|
|`edit`|Edit comment on the item in the White List.|
|`list`|List items(-s) in the White List.|

Please note that by default `list` command outputs only first 100 items in the list as if it was run as `whitelist ip list --limit 100`.
To check whether specific IP address is in the list, you can run the following command:

```
whitelist ip list --by-ip 12.34.56.78
```

where `12.34.56.78` is that specific IP address.

`value` is an item to manipulate with. It can be IP itself or a country code (find the necessary country codes in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#IPv4_CIDR_blocks) in ISO ALPHA-2 CODE column), or a domain name.

`option ` can be one or few of the optional arguments from the table above and one more:

| | |
|-|-|
|`--comment`|Allows to add a comment to the item.|
|`--full-access`|Only for `move` and `edit` commands.<br>Allows to grant full access to the IP or subnet ignoring the rules in Blocked ports.|
|`--no-full-access`|Only for `move` and `edit` commands.<br>Allows to remove full access of the IP or subnet.|

**Examples:**

1. The following commands adds IP `1.2.3.4` to the White List with a comment “one bad ip”:

   ```
   imunify360-agent whitelist ip add 1.2.3.4 --comment “one good ip”
   ```

2. The following command returns a list of IPs in the White List which are from Bolivia:

   ```
   imunify360-agent whitelist --by-country-code BO
   ```

3. The following command adds domain with a name `example.com` to the White List:

   ```
   imunify360-agent whitelist domain add example.com
   ```

4. The following command checks domains in the White List:

   ```
   imunify360-agent whitelist domain list
   ```


## Proactive

These commands allow to manage Proactive Defense feature.

Usage:

```
imunify360-agent proactive [command] [--option] <value>
```

Available commands:

| | |
|-|-|
|`ignore delete path`|allows to remove a file from Proactive Defense Ignore List.|
|`ignore delete rule`|allows to remove a rule for a file from Proactive Defense Ignore List.|
|`list`|allows to list Proactive Defense events.|
|`details`|allows to show details for the event.|
|`ignore list`|allows to list files included to Proactive Defense Ignore List.|
|`ignore add`|allows to add a file to Proactive Defense Ignore List.|

`option` can be one or few of the optional arguments listed above and one more.

| | |
|-|-|
|`--path`|for ` ignore add`, `ignore delete path`, `ignore delete rule` commands.<br>Allows to specify a path to the file.|
|`--id`|for ` details`, `ignore delete rule` commands.<br>Allows to specify rule id.|
|`--rule-id`|only for ` ignore add` command.<br>Allows to specify rule id.|
|`--rule-name`|only for ` ignore add` command.<br>Allows to specify rule name.|

**Examples:**

1. This command adds a file located at `/home/user/index.php` to Proactive Defense Ignore List for the rule id 12 and name `Suspicious detection rule`.
It means that Proactive Defense will not analyze this file according to this rule:

   ```
   imunify360-agent proactive ignore add --path /home/user/index.php --rule-id 12 --rule-name 'Suspicious detection rule'
   ```

2. This command removes files located at `<path to file 1>` and `<path to file 2>` from Proactive Defense Ignore List:

   ```
   imunify360-agent proactive ignore delete path <path to file 1> <path to file 2>
   ```




