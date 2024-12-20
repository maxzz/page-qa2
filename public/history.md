#### version 4.0.064 &nbsp;v3 <span class="date">07.08.2024</span>
* Fixed an issue [SFLINK-1354](https://tracksafe.hidglobal.com/browse/SFLINK-1354) where the username on a site was detected as a password.

#### version 4.0.061 &nbsp;v3 <span class="date">12.08.2023</span>
* The first extension created to support manifest version 3.

#### version 4.0.023 <span class="date">08.13.2023</span> Public
* The extension is built using a new build system and a new branch to provide future support for v2 and v3 manifests.
* Bug [91453](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=91453) 
  Password fill-in issue on "Client360" (client360.fiservapps.com)
  Updated the algorithm for populating form values to provide an asynchronous chain of events.

#### version 3.4.711 <span class="date">04.02.2023</span>
* Bug [91506](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=91248) 
  Bank of Washington: Unable to create managed logon (two password protected fields for username and password)
  Added a customization for working with this site. (3.4.711 04.02.2023)
* Bug [91370](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=91370) 
  Bank of Utica - Navigator (FiServ) site not trainable and doesn't submit
  Added a customization for working with this site. (3.4.711 04.02.2023)
* The extension is built using the new build system.
#### version 3.4.709 <span class="date">02.26.2023</span> Public
* Bug [91248](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=91248) 
  PM icon and fill-in move to unprotected field except when not visible due to window resizing.
  Added the ability to filter out the context script fields. (3.4.709 02.26.2023)
* Bug [91315](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=91315) 
  "Payroll people" website was supported in extension .439 but no longer works in .700.
  Added a customization for working with this site. (3.4.702 01.30.2023)
  
#### version 3.4.700 <span class="date">12.04.2022</span> Public
* Bug [91153](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=91153) 
  Disable use of personal logins if GPO Add personal logins is disabled. 
  Added perosnal logins filter to drop personal logins if add new logins not allowed with GPO.
* Bug [91149](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=91149)
  "BAC" logon screen template does not submit.
* Bug [90673](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=90673)
  Issues training template for customer internal portal logon with two password fields (and pw change).
 
#### version 3.4.689 <span class="date">09.23.2022</span>
* Bug [90589](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=90589)
  No input fields detected in the target screen message - thrivepatientportal.com [Shadow DOM].
  I have added a new customization to send raw input thread events from DPAgent to a web page. This is a technical support release for testing with a customer.
  Use [Exact link to test it](https://www.thrivepatientporta@l.com/oauth/sso/?client_id=thrive&scope=user/%2a.%2a+offline_access+openid+profile&state=2809647d-3b98-42c2-b225-0e159e610556&redirect_uri=https://www.thrivepatientporta@l.com/oauth/callback&_provider=provider&_tenant=texinst). (3.4.689 09.23.2022)

#### version 3.0.906 <span class="date">08.23.2022</span>
* Task [90559](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=90559)
  This is a modified old version of the HP extension, released at the request of Google.
  I removed unused 'tabs' privilege as requested by Google.
  The extension v3.0.906 (HP only) has been successfully published to the Chrome Web Store. (3.0.906 08.23.2022)

#### version 3.4.590 <span class="date">08.08.2022</span>
* Bug [90786](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=90786)
  Request extension customization for two page logon https://refundplus.alliedsolution@s.net/account/login.
  Use [https://refundplus.alliedsolution@s.net/account/login](https://refundplus.alliedsolution@s.net/account/login) for testing. (3.4.587 08.01.2022)
* Bug [90785](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=90785)
  DP Icon Not Appearing at Logon Screen in Chrome Ext 3.4.0.442.
  Use [https://www.sageworksanalys@t.com](https://www.sageworksanalys@t.com) for testing. (3.4.590 08.08.2022)

#### version 3.4.585 <span class="date">07.23.2022</span> Public
* Bug [90430](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=90430)
  Unable to PMAT Edge/Chrome train managed logon for banno.com/a/login [ShadowRoot DOM].
  Added new customization for shadow DOM forms.
  Use [https://bann@o.com/a/login](https://bann@o.com/a/login) for testing. (3.4.564 07.09.2022)
* Bug [90589](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=90589)
  No input fields detected in the target screen message - thrivepatientportal.com [Shadow DOM]
  * Use [https://thrivepatientporta@l.com](https://thrivepatientporta@l.com) for testing.
  * Use [https://www.thrivepatientporta@l.com/oauth/sso](https://www.thrivepatientporta@l.com/oauth/sso/?client_id=thrive&scope=user/%2a.%2a+offline_access+openid+profile&state=2809647d-3b98-42c2-b225-0e159e610556&redirect_uri=https://www.thrivepatientporta@l.com/oauth/callback&_provider=provider&_tenant=texinst) for testing. (3.4.585 07.23.2022)
 
#### version 3.0.905 <span class="date">06.03.2022</span>
* Task [90559](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=90559)
  This is a modified old version of the HP extension, released at the request of Google.
  I removed unused privileges as requested by Google.
  The extension v3.0.905 (HP only) has been successfully published to the Chrome Web Store. (3.0.905 06.03.2022)

#### version 3.4.442 <span class="date">05.10.2022</span> Public
* Added parsing of URL query parameters to improve password change form detection. (3.4.439 04.25.2022)
* Bug [90542](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=90542)
  PM icons in totally strange places. (3.4.439 04.25.2022)
* Fixed detection of search forms as login forms (3.4.442 05.10.2022)

#### version 3.4.437 <span class="date">04.12.2022</span>
* Bug [89580](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89580)
  Unable to train Ncontracts in automatic mode for use with Edge. This is single field login. 
  This version fixes training and submitting the form on the second page. (3.4.437 04.12.2022)
* Bug [68200](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=68200)
  No PM icon on Chrome browser for website: www.concursolutions.com then shows PM icon upon reboot.. (Two page logon)
  This version fixes training and submitting the form on the second page. (3.4.437 04.12.2022)

#### version 3.4.432 <span class="date">03.16.2022</span> Public
* Bug [88802](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89771)
  Unexpected PM choose account (orphaned) dialogue box spawned from timed out background website.
  Update the "immediate authentication" logic to only ask for login information when a browser tab is active.
  A test page that refreshes when a tab is inactive can be found [here](https://maxzz.github.io/test-pm-domain-logins/#/apage?from=homeToLoginA).
  To run the test, open two browser tabs (one for login A and one for login B) with this URL, create logins with the "authenticate immediately" option,
  and set the refresh interval on the test pages to approximately 10 seconds.
  Within 10 seconds, switch to a new tab. The authentication dialog should only appear when the tab with login A or login B becomes active.
  (3.4.432 03.16.2022)
#### version 3.4.430 <span class="date">03.03.2022</span>
* Bug [89771](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89771)
  Add support for the customer website [www.is@c.ca](https://www.is@c.ca/SignedInHome/Pages/login.aspx) (3.4.430 03.03.2022)
* Bug [90105](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=90105)
  Add support for the customer website [meridianlin@k.com](https://cs.consumer.meridianlin@k.com) (3.4.430 03.03.2022)

#### version 3.4.427 <span class="date">12.22.2021</span>
* Bug [89777](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89777)
  No input fields detected on smartsheet.com (3.4.427 12.22.2022)

#### version 3.4.425 <span class="date">12.21.2021</span>
* Bug [89948](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89948)
  FIS eAccess intermittent initial logon fail
    * Fix [auth.cashedg@e.com](https://auth.cashedg@e.com/am/UI/Login) where username was not recognized (aka fiserv website for Compass Identity Management). (3.4.421 12.21.2021)
    * Add a two second delay before submitting data for https://www.efund@s.com (hint: clear cookies to get back initial state). (3.4.424 12.21.2021)
* Bug [89340](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89340)
  Unable to train "originate loans" site for use with Edge.  (3.4.425 12.21.2022)
* Bug [89771](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89771) 
  Unable to train ISC website logon screen w/ DP 3.5 and Edge. 
  A fix for automatic form submission. (3.4.425 12.21.2021)

#### version 3.4.419 <span class="date">12.06.2021</span> Public
* Bug [89863](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89863) 
  DP PM IE template representation in Edge in case of domain logon (a few different logon pages within the domain) (3.4.415 12.05.2021)
  * Fix the 'Cash Box' field fill-in (3.4.419 12.06.2021)
* Fix the deployment of the Chrome protected version (no code changes) (3.4.416 12.05.2021)

#### version 3.4.408 <span class="date">11.16.2021</span>
* Bug [89809](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89809) 
  Unable to PMAT train "Cisco unified intelligence" two step logon page via Chrome. customer issue (3.4.408 11.16.2021)
* Bug [89849](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89849) 
  Assistance with loanspq.com templates in Chrome. customer issue (3.4.406 11.11.2021)
 
#### version 3.4.404 <span class="date">11.07.2021</span>
* Bug [89771](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89771) 
  Unable to train ISC website logon screen w/ DP 3.5 and Edge.
  It is possible now to train and fill out data on ISC website. 
  There is still an issue with automatic form submission, but the client has not reported it yet. (3.4.404 11.07.2021)
 
#### version 3.4.385 <span class="date">09.26.2021</span> Public
* Bug [89407](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89407) 
  'Web Track' website logon being detected as a change password screen.
  Added an additional field to the login screen at the request of the client. (3.4.385 09.26.2021)

#### version 3.4.375 <span class="date">08.31.2021</span> Public
* Bug [89340](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89340) Help training originate loans site for use with Edge.
    * added support for single field customer login on [account.docusig@n.com](https://account.docusig@n.com). (3.4.367 08.19.2021)
    * added support for two usernames customer login on [velwww.scsc@u.com](https://velwww.scsc@u.com). (3.4.375 08.31.2021)
* Bug [89407](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=89407) 
  'Web Track' website logon being detected as a change password screen. (3.4.367 08.31.2021)

#### version 3.4.365 <span class="date">08.19.2021</span> Public
* Fixed bug [88982](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=88982) 
  [QA] username field shows empty on Two page logon(office 365) using grabbing credentials. (3.4.365 06.16.2021)
  The latest extension covers the cases of creating a login from the second page with a password only field when (3.4.365 06.16.2021):
    * creating login from the grabbing credentials popup
    * creating login from the feedback icon
* Added a new customization mechanism for multi-page logins (3.4.365 06.16.2021)

#### version 3.4.350 <span class="date">05.24.2021</span> Public
* Fixed bug [88975](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=88975) [QA] Getting one more field as USERNAME when we trying to do Grabbing credentials for personal logon (3.4.350 05.24.2021)
* Updated minification algorithm for the production version of the extension. (3.4.341 05.10.2021)
* Fixed bug [88787](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=88787) Unable to train jackhenry.com to match on Chrome as common issue and can be reused on other websites (3.4.315 05.09.2021)
* Fixed bug [88607](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=88607) Unable to train https://bridger.lexisnexi@s.com/XgAuth/ to match on Chrome (3.4.315 05.09.2021)

#### version 3.4.301 <span class="date">03.22.2021</span> Public
* Fixed bug [88575](http://dp-tfs.crossmatch.net:8080/tfs/DefaultCollection/Prime/_workitems?id=88575) PMAT incorrectly reports browser extension is not in place when training managed logon against Chrome. (3.4.301 03.22.2021)

#### version 3.4.277 <span class="date">01.29.2021</span> Public
* Added support for single field login screens on [google.com](https://accounts.google.com/signin/v2/identifier?hl=en&passive=true&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAZAAQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin). (3.4.277 01.29.2021)
* Added support for single field login screens on [adp.com](https://online.adp.com/signin/v1/?APPID=WFNPortal&productId=80e309c3-7085-bae1-e053-3505430b5495&returnURL=https://workforcenow.adp.com/&callingAppId=WFN). (3.4.271 01.28.2021)
* Fixed bug [76577](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=76577) login.avidexchange.net password change works on IE but not Chrome (3.4.271 01.28.2021)
* Fixed bug [88241](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=88241) Issue with managed logon template in Chrome for Availity.com (3.4.259 01.21.2021)

#### version 3.4.226 <span class="date">12.07.2020</span> Public
* This version allows the use of profiles that use "Windows password" as profile credential (bug [87536](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87536)). (3.4.226 12.07.2020)
* Wildcard matching: several customer bugs are associated (bugs [86866](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=86866) and [87536](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87536)). The fix has not yet been confirmed by customer. A customer session is scheduled. (3.4.224 11.15.2020)
* Fixed bug [87531](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87531) Facebook: In Save prompt, PM extension Icon overlapped.
* Fixed bug [87803](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87803) [Jp] Grabbing credentials UI contents are not properly aligned to Japanese language (3.4.220 10.15.2020).
* Fixed bug [87789](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87789) [French] Grabbing credentials contents are not localized to French language. (3.4.219 10.15.2020).
* Fixed bug [87622](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87622) [PMAT] PM Icon is showing in Change Password Screen instead of showing change PWD PM icon (3.4.216 10.12.2020).

#### version 3.4.215 <span class="date">09.24.2020</span> Public
* Removed optional privilege requests for contextMenus and tabs (3.4.215 09.24.2020)
* Fixed bug [87384](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87384) A new Managed logon Profile is created every time ... (3.4.214 09.08.2020)
* Fixed bug [87375](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87375) "Help" option from the PM trained Icon ... (3.4.214 09.08.2020)
* Added support for two fields login on [paycomonlin@e.net](https://www.paycomonlin@e.net/v4/ee/web.php/app/login). It may have side effect on the web pages recognition where the password change screen and login are under the exactly the same URL (however this is a theoretical case vs the customer case). (3.4.210 08.30.2020)
* Added password protected debug build deployed to QA website. (3.4.207 08.16.2020)
* Fixed bug [87197](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87197) [PMAT] Unexpected Grabbing Credentials pop up, if user typed same credentials manually on PM logon page (3.4.192 08.15.2020)
* Fixed bug [87179](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87179) NMLS (Federal Registry) The website URL contains the 'registry' word and was treated as registration form. (3.4.184  08.02.2020)
* Fixed bug [87057](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=87057) Grabbing Credential window appeared after our fill in.
* Fixed bug [86849](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=86849) VYI is not appearing for Grabbing credential after clicking 'Save'. (3.4.180  06.28.2020)
  
#### version 3.4.118 <span class="date">06.18.2020</span>
* Fixed bug [86680](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=86680). Added support for [fiserv.com](https://www.intelligentworkplace.app.fiser@v.com/#/authentication/login/Login) applications with passwords implemented as text and obfuscated with dotsfont.
* Fixed missing ID and name on form elements; matching new and existing logins but now the password change. (3.4.101  06.14.2020)
* First release of extenson with Domain Credentials. (3.4.83  06.08.2020)
* New version that supports PMAT queries and has new UI. (3.4.70  05.09.2020)
* Fixed detection of Chromium Edge, Opera, and Brave.
* Improved behaviuor of highlighter to avoid highlighter leftovers after PMAT training.
 
#### version 3.0.958 <span class="date">02.14.2020</span>
* Fixed UI elements (menu and highlight) positioning for Bug [77459](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=77459) - login.authorize.net doesn't work with Chrome (02.10.2020)
* Fixed file protocol URLs handling.
  
* Bug [75479](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=75479): ADP Site Chrome Change Password Issue. Fixed password change screen support for manageed logins. (02.13.2020)
  
* Bug [77694](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=77694): Chrome extension need to follows selected fields only and ignore pin on boxoffice.network-box.com. Added support for 2FA (Two Factor Authentication) forms. The training can be done if we can distinguish 2FA form from password change form. To distinguish such forms the form should have second field ID (or name) started with word 'pin' (case insensitive).

#### version 3.0.904 <span class="date">10.16.2019</span>
* Updated fix for bug [73828](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=73828):
    Fixed the difference with empty andd undefined username during check for grabbing credentials. (3.0.904: 10.16.2019)

* Update grabbing credentials prompt will not happen for trained profiles if user checks "Don't prompt". This was customer requset because they have new passord every login. (3.0.904: 10.16.2019)

* Updated fix for bug [73828](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=73828):
    Added ability to select managed profiles without username when grabbing credentials happen. (3.0.902: 10.11.2019)

* Fixed bug [73830](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=73830):
    These two websites (target.com and wallmart.com) were developed by the same person and following the same unusual approach. Instead of having the new password and confirm password the website is asking for old and new passwords. This very “creative”. I have fixed this bug for both target.com and wallmart.com. (3.0.900: 10.10.2019)

#### version 3.0.897 <span class="date">10.02.2019</span>

* Fixed bug [73379](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=73379): 
    Change password on adp.com was detected as sign-up form vs radioshack.com. (3.0.897: 10.02.2019)

* Fixed bug [72415](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=72415): 
    Grabbing credentials window is still displayed when Prompt to remember logon credentials is unchecked. (3.0.894: 09.25.2019)

    The expected behavior is that with the dashboard checkbox box OFF there won’t be grabbing credential prompts, but prompt will appear for already created logins. The current prompt in the dashboard “Prompt to remember logon credentials” does not explain what is happening. The prompt should be something like: “Prompt to remember new logon credentials”. This will be more appropriate because we have managed logins that are updated always, and we have ability to create new personal logins.

#### version 3.0.892 <span class="date">09.16.2019</span> Public

* I have released the new extension version 3.0.892 with a temporary fix for DigitalPersona 2.3.0 - 3.2.x, which won't show the recurrent grabbing credential prompts if profile data are invalid.
* 09.23.2019. The version 3.0.892 has been released to the public access.

#### version 3.0.888 <span class="date">09.07.2019</span>

Returned back behaviour with the grabbing credentials prompt. It's better to have prompt then not to prompt for Managed logins.

#### version 3.0.887 <span class="date">09.06.2019</span>

Fixed two unrelated bugs during bug [72587](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=72587) (repeating grabbing credentials prompt in DP 2.3.0.75) investigation.

#### version 3.0.880 <span class="date">08.24.2019</span>
Fixed problems on:
* [americanexpress.com](https://global.americanexpress.com/login?inav=iNavLnkLog)
* [dropbox.com](https://www.dropbox.com/login)
* [www.radioshack.com](https://www.radioshack.com/account/login?checkout_url=/account/orders)
* [online.citi.com](https://online.citi.com/US/login.do)

Fixed release build (typo: closing bracket instead of curly bracket).

#### version 3.0.793 <span class="date">08.20.2019</span>
First release of the extension new engine to address slowness issues.

#### version 3.0.571 <span class="date">07.03.2019</span> 
* Bugs [67935](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=67935). DP Kiosk: Chrome Password Manager always asking to remember password.

#### version 3.0.405 <span class="date">04.10.2019</span> Public 
* Bugs [58166](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=58166), [60371](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=60371). Browser slowness on heavy pages. The input fields visibility check is much faster now, addressed Concur message box.
* [Unpacked QA version](https://chrome.google.com/webstore/detail/digitalpersona/meaddmodbgjgiokfloipamincjjafffi)

#### version 3.0.390 <span class="date">03.04.2019</span> 

* Fixed bug [60903](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=60903&triage=true) (Altus word in the Crededncials Grabbing dialog title).
* Improvement for bug [58180](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=58180&triage=true) (Corelation website with Firefox).

#### version 3.0.386 <span class="date">02.07.2019</span> Public

* Fixed bugs [61390](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=61390) and [58008](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=58008). In the Google Store on the installation page, instead of the real extension name the “{ProductName}” title was shown.

#### version 3.0.380 <span class="date">12.11.2018</span> - 3.0.384 <span class="date">02.03.2019</span>

* Fixed bug [58109](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=58109) - website. www.vimeo.com Not able to create Personal login. The login form name is login, but email field is sign-up. This is very special case only for this website.
* Bug [58181](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=58181) - website www.concursolutions.com. Submit is not working using Chrome. Changes: The PM will not update the current selected index of the drop-down list element if the trained profile has the same index. On www.concursolutions.com the "Change language" field will reload the page with already filled in fields and submit will fail because the password will be empty on the new page. Now if the index of the drop-down element on the page is different the fill-in/submit will fail for the first time and the second time the submit will be succeed.
* Added the mouse click event handler on the feedback icon. This is helpful when the browser window focused and mouse is already over the feedback icon (we handle just mouse in and out events).


#### version 3.0.378 <span class="date">12.09.2018</span> Public

* Fixed bug [57575](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=57575) - Chrome/Firefox extension does not support OTS logins. I've implemented the OTS URL matching for Chrome/Firefox as it was done for IE.
* Fixed bug [58165](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=58165) - website www.concursolutions.com. PM icon will appear unexpectedly after logging in.
* Fixed bug [58167](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=58167) - website www.concursolutions.com. PM icon will appear unexpectedly
* Fixed bug [58168](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=58168) - website www.salesforce.com. PM icon will appear unexpectedly after logging in

> Released Chrome: [https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.378_on_2018.12.09-r-chrome.zip](https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.378_on_2018.12.09-r-chrome.zip)
>
> Released Firefox: [https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.378_on_2018.12.09-r-firefox.xpi](https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.378_on_2018.12.09-r-firefox.xpi)


#### version 3.0.364 <span class="date">11.28.2018</span>

* Fixed bug [57856](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=57856) - Bug 57856 - New PM icon appears to be too big and not right aligned on some logon pages using FF/Chrome. Updated the feedback icon positioning algorithm and size determination.
* Optimized the URL match queries during page update. Bug [57575](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=57575) (Firefox Plugin, cant identify web page) fixing in progress.

#### version 3.0.348 <span class="date">11.04.2018</span>

* Fixed bug [57699](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=57699) - PM icon will appear unexpectedly on vSphere
* Fixed bug [57701](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=57701) - nordstrom.com sign-up icons
* Fixed double icon removal and icon placement.
* Focus/blur when menu activated/deactivated.

#### version 3.0.341 <span class="date">11.03.2018</span>

Added double icon removal and fixed icon placement next to the input field instead of appending to the input parent.

#### version 3.0.327 <span class="date">11.02.2018</span>

PM will hide the Chrome browser popup menu for the user name field when mouse is over the DP feedback icon.

#### version 3.0.316 <span class="date">11.01.2018</span>

* Fixed bug [57691](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=57691) - website [srbjiwc6.behaviosec.com](https://srbjiwc6.behaviosec.com/BehavioSenseDashboard/index.jsp) DP icon is floating over another field.
* Updated feedback icons and feedback menu styles.
* Added feedback icon update on the browser window resize event.

#### version 3.0.246  <span class="date">10.29.2018</span> Public

Fixed bug [53044](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=53044) The HP extension was not updated. The version 3.0.246 hides the Help items for HP product.

> Released Chrome: [https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.246_on_2018.10.30-r-chrome.zip](https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.246_on_2018.10.30-r-chrome.zip)
>
> Released Firefox: [https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.246_on_2018.10.30-r-firefox.xpi](https://www.crossmatch.com/AltusAddons/g01/current/dppm-3.0.246_on_2018.10.30-r-firefox.xpi)


#### version 3.0.243 <span class="date">10.27.2018</span>

Shortened the extension description per Google Store requirements; updated icons.

#### version 3.0.226 <span class="date">09.12.2018</span>
		
Fixed [bug 52235](http://dp-tfs:8080/tfs/DefaultCollection/Prime/_workitems?id=52235): DPCA 3.0: Managed Logon CP Screen performs submit in Chrome/FF when 'Do Not Submit' option was selected.

#### version 3.0.224 <span class="date">09.11.2018</span>

* On [wellsfargo.com](https://www.wellsfargo.com) the remember me checkbox is unchecked for the new login. This is important that next login two fields will be show (not just password, since user name is remembered).
* On [fremontbank.com](https://www.fremontbank.com) the correct user name field highlighted for the new login. Also drop-down list is not part of default login, but can be selected from defaults. Search field is not treated as user name anymore.

#### version 3.0.222 <span class="date">09.10.2018</span>

Fixed fields highlighting.

#### version 3.0.219 <span class="date">09.09.2018</span>

Fixed select element options text.

#### version 2.0.7235 <span class="date">03.12.2018</span>

The last PM extension version compatible with the old Firefox ESR 52. ESR 52 is the last ESR release that supports legacy add-ons. Support for ESR 52 officially ends on August 2018. More information can be found [here](https://blog.mozilla.org/addons/2017/10/03/legacy-add-on-support-on-firefox-esr/).

> Released Firefox: [https://www.crossmatch.com/AltusAddons/g01/current/dppm-2.0.7235_on_2018.03.12-r-firefox.xpi](https://www.crossmatch.com/AltusAddons/g01/current/dppm-2.0.7235_on_2018.03.12-r-firefox.xpi)
