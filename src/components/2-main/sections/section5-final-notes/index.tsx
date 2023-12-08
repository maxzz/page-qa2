import { IS_GITHUB, URLS, runLocation } from '@/store/apis';

export function Section5_FinalNotes() {
    return (
        <div className="py-1 text-sm">
            <h2 className="mt-1 text-base font-semibold">Check for duplicate extension installations</h2>
            <p>
                Only one DigitalPersona extension can run at the same time in the same browser.
                After completing (or before starting) the installation of the DigitalPersona extension,
                ensure that all previous versions of the extension are uninstalled.
            </p>

            <h2 className="mt-1 text-base font-semibold">Obfuscated links</h2>
            <p>
                Links in the Release Notes section are masked with the @ sign before the last character of the domain name
                to fight search engine spiders (web crawler robots). Remove the @ symbol before opening the link.
            </p>

            <h2 className="mt-2 text-base font-semibold">Browser extensions installation instructions</h2>
            <p>
                Additional documents are available on{' '}
                <a className="hoverurl link-up" href={URLS.LOCAL_HINTS} target="_blank">this website</a> and on the{' '}
                <a className="hoverurl link-up" href={URLS.CONFLUENCE_HINTS} target="_blank">HID confluence (intranet)</a> website.
            </p>

            <h2 className="mt-2 text-base font-semibold">Links to install the extension</h2>
            <ul className="ml-4 list-disc">
                <li>
                    Chrome web store extension <a className="hoverurl" href={URLS.INSTALL_GOOGLE_STORE} target="_blank">installation page.</a>
                </li>
                <li>
                    DP extension <a className="hoverurl" href={URLS.INSTALL_DP_PAGE} target="_blank">installation page</a>.
                </li>
                <li>
                    DP extension <a className="hoverurl" href="https://maxzz.github.io/page-extension-installation" target="_blank">
                        the new installation page test</a> (not in production yet).
                </li>
            </ul>

            <h2 className="mt-2 text-base font-semibold">Experiments</h2>
            <ul className="ml-4 list-disc">
                <li>
                    <a className="hoverurl" href="https://maxzz.github.io/dropzone" target="_blank">PMIT (Password Manager Inverstigation Tool) utility</a>{' '}
                    (the latest version).
                </li>
                <li>
                    <a className="hoverurl" href={URLS.HID_PMAC} target="_blank">PMAC (Password Manager Administrator Commands) utility</a>{' '}
                    (not in production yet).
                </li>
            </ul>

            <h2 className="mt-2 text-base font-semibold">QA website history</h2>
            <ul className="ml-4 list-disc">
                <li>
                    The previous QA website is still <a className="hoverurl" href={URLS.QA_WEBSITE_OLD} target="_blank"> available here</a>.
                </li>
                {IS_GITHUB &&
                    <li>
                        The source code for this website on <a className="hoverurl" href="https://github.com/maxzz/page-qa2" target="_blank">GitHub is here</a>.
                    </li>
                }
            </ul>

            <h2 className="mt-2 text-base font-semibold">About</h2>
            <ul className="ml-4 list-disc">
                <li>
                    This __BUILD_VER__ version of the QA website is built on __BUILD_DATE__<span>.</span>
                </li>
                <li className="text-xs whitespace-pre">
                    Running from location:
                    <br />
                    {JSON.stringify(runLocation, null, 4)}
                </li>
            </ul>
        </div>
    );
}
