import { useEffect, useState } from "react";
import { beautify } from "./beautify";

function format(text: string, perLine: number): { formated: string; lines: number; error?: undefined; } | { error: string; formated?: undefined; lines?: undefined; } {
    try {
        const o = JSON.parse(text);
        const formated = beautify(o, null, 4, perLine);
        const lines = formated.split(/\r?\n/).length;
        return {
            formated,
            lines,
        };
    } catch (error) {
        return {
            error: 'invalid input'
        };
    }
}

export function JsonBeautifier() {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [perLine, setPerLine] = useState(2000);
    const [nLines, setNLines] = useState(0);
    const [formatted, setFormatted] = useState('');

    // useEffect(() => {
    //     const t = '{"gotprofs":{"data":{"1652828189":{"fields":[{"dpid":"t.loginform.os_username.os_username.dUsername","prindex":1,"value":"makzak"},{"dpid":"p.loginform.os_password.os_password.dPassword","hash":"0000000000","prindex":2},{"dpid":"c.loginform.os_cookie.os_cookie.dRemember me","prindex":3,"value":"0"},{"dpid":"b.loginform.loginButton.login","prindex":4}],"name":"wiki.hidglobal.com - makzak","nosubm":false,"pswxon":"1660695547","tsid":"1652828189","updon":"1660695547","url":"https://wiki.hidglobal.com/login.action?os_destination=%2Fpages%2Fviewpage.action%3FspaceKey%3DALTUS%26title%3DActive%2BDirectory%2BGroup%2Bbased%2BLogon%2BPolicy&permissionViolation=true"},"1652828594":{"fields":[{"dpid":"t.frmMain.username-input.username.dUsername","prindex":1,"value":"max"},{"dpid":"p...","hash":"0000000000","prindex":2}],"name":"www.concursolutions.com - max","nosubm":false,"tsid":"1652828594","updon":"1652828622","url":"https://www.concursolutions.com/","usedcnt":"1","usedon":"1652829157"},"1653510640":{"fields":[{"dpid":"t.#dp#<;)lid=1..corpId.dコーポレートID","prindex":1,"value":"Techsia"},{"dpid":"t.#dp#<;)lid=1..userId.dユーザID","ign":"1","prindex":2},{"dpid":"p.#dp#<;)lid=1..password.dパスワード","hash":"0000000000","prindex":3}],"name":"prime","nosubm":false,"tsid":"1653510640","updon":"1653510685"},"1653510753":{"fields":[{"dpid":"t.inputfrm.focusidtech1.UserID","prindex":1,"value":"1640007"},{"dpid":"p.inputfrm.._word","hash":"0000000000","prindex":2},{"dpid":"c.inputfrm.sample_4.svlid.dこの情報をブラウザに保存する","prindex":3,"value":"0"}],"name":"prime-jp","nosubm":false,"tsid":"1653510753","updon":"1653510826"},"1657409040":{"fields":[{"dpid":"t.#dp#<;)lid=1.email..dEmail","prindex":1,"value":"123"},{"dpid":"p.#dp#<;)lid=1.password..dPassword","hash":"0000000000","prindex":2}],"name":"banno.com - 123","nosubm":true,"tsid":"1657409040","updon":"1657409070","url":"https://banno.com/a/login","usedcnt":"1","usedon":"1657409405"},"1657583168":{"fields":[{"dpid":"t.#dp#<;)lid=50...dUsername oauth","prindex":1,"value":"123"},{"dpid":"p.#dp#<;)lid=50...dPassword oauth","hash":"0000000000","prindex":2}],"name":"www.thrivepatientportal.com - 123","nosubm":false,"tsid":"1657583168","updon":"1663978198","url":"https://www.thrivepatientportal.com/oauth/sso/?client_id=thrive&scope=user/*.*+offline_access+openid+profile&state=2809647d-3b98-42c2-b225-0e159e610556&redirect_uri=https://www.thrivepatientportal.com/oauth/callback&_provider=provider&_tenant=texinst","usedcnt":"6","usedon":"1663662209"},"1658621590":{"fields":[{"dpid":"t.form1.userlist_id.userlist_id","prindex":1,"value":"max"},{"dpid":"p.form1..userlist_password","hash":"0000000000","prindex":2},{"dpid":"t.form1..userlist_name","prindex":3,"value":"id"},{"dpid":"c.form1..cookie_save","prindex":4,"value":"0"}],"name":"www.liveon.ne.jp - max","nosubm":true,"tsid":"1658621590","updon":"1658621625","url":"https://www.liveon.ne.jp/Login/100.php"},"1659303405":{"fields":[{"dpid":"t.username-form.react-username.username.dUsername","prindex":1,"value":"max"},{"dpid":"p...","hash":"0000000000","prindex":2}],"name":"refundplus.alliedsolutions.net - max","nosubm":false,"tsid":"1659303405","updon":"1659303443","url":"https://refundplus.alliedsolutions.net/account/login"},"1659999855":{"fields":[{"dpid":"t.Form1.CustomerID._ctl0:_ctl0:BodyContent:PageContentPlaceHolder:CustomerID.dUsername","prindex":1,"value":"max@max.com"},{"dpid":"p...","hash":"0000000000","prindex":2}],"name":"www.sageworksanalyst.com - max@max.com","nosubm":false,"tsid":"1659999855","updon":"1659999881","url":"https://www.sageworksanalyst.com/"},"1661846441":{"fields":[{"dpid":"t.updatePasswordForm.userNameInput.UserName.dsomeone@example%2ecom","prindex":1,"value":"max.zakharzhevskiy@hidglobal.com"},{"dpid":"p.updatePasswordForm.oldPasswordInput.OldPassword.dOld password","hash":"0000000000","prindex":2},{"dpid":"p.updatePasswordForm.newPasswordInput.NewPassword.dNew password","hash":"0000000000","prindex":3},{"dpid":"p.updatePasswordForm.confirmNewPasswordInput.ConfirmNewPassword.dConfirm new password","hash":"0000000000","prindex":4},{"dpid":"b.updatePasswordForm.submitButton.Submit","prindex":5},{"dpid":"b.updatePasswordForm.cancelButton.Cancel","prindex":6}],"name":"sso.assaabloyservices.com - max.zakharzhevskiy@hidglobal.com","nosubm":false,"pswxon":"1668805911","tsid":"1661846441","updon":"1668805911","url":"https://sso.assaabloyservices.com/adfs/portal/updatepassword/","usedcnt":"1","usedon":"1668805848"},"1668811689":{"fields":[{"dpid":"t.logonForm.PrincipalID.PrincipalID.dUser","prindex":1,"value":"max"},{"dpid":"p.logonForm.PrincipalPWD.PrincipalPWD.dPassword","hash":"0000000000","prindex":2},{"dpid":"t.logonForm.OrgID.OrgID.dInstitution","prindex":3,"value":"21"},{"dpid":"b.logonForm.submitButton.submitButton","prindex":4},{"dpid":"b.logonForm.cancelButton.cancelButton","prindex":5}],"name":"localhost:8080 - max","nosubm":false,"pswxon":"1674165293","tsid":"1668811689","updon":"1674165293","url":"http://localhost:8080/","usedcnt":"2","usedon":"1674165265"},"1676935829":{"fields":[{"dpid":"t.form1.txtName.txtName","prindex":1,"value":"max"},{"dpid":"p.form1.txtPass.txtPass","hash":"0000000000","prindex":2},{"dpid":"b.form1.btnLogin.btnLogin","prindex":3}],"name":"www.callipay.net - max","nosubm":false,"tsid":"1676935829","updon":"1676935866","url":"https://www.callipay.net/","usedcnt":"1","usedon":"1677449780"},"1677453468":{"fields":[{"dpid":"t.aspnetForm.ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_signInUserName.ctl01$TemplateBody$WebPartManager1$gwpciNewContactSignInCommon$ciNewContactSignInCommon$signInUserName.dUsername","prindex":1,"value":"max"},{"dpid":"p.aspnetForm.ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_signInPassword.ctl01$TemplateBody$WebPartManager1$gwpciNewContactSignInCommon$ciNewContactSignInCommon$signInPassword.dPassword","hash":"0000000000","prindex":2},{"dpid":"c.aspnetForm.ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_RememberMe.ctl01$TemplateBody$WebPartManager1$gwpciNewContactSignInCommon$ciNewContactSignInCommon$RememberMe.dKeep me signed in","prindex":3,"value":"0"},{"dpid":"b.aspnetForm.ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_SubmitButton.ctl01$TemplateBody$WebPartManager1$gwpciNewContactSignInCommon$ciNewContactSignInCommon$SubmitButton","prindex":4}],"name":"www.iafci.org - max","nosubm":true,"tsid":"1677453468","updon":"1677453488","url":"https://www.iafci.org/MembersOnly/iCore/Contacts/Sign_In.aspx?WebsiteKey=ba0e891e-6cec-42b1-a84b-d7c750e0b74c&LoginRedirect=true&returnurl=/MembersOnly/Resources/Directory/Shared_Content/Member_Directory/Member_Directory.aspx?hkey=b7e209c8-9944-4f57-85ba-881762087913"}},"opts":{"dogrb":true,"nlogins":false},"what":"profs"}}';
    //     //const t = '{"opts":{"dogrb":true,"nlogins":false},"what":"profs"}';
    //     //const t = '{"s": 4}';
    //     setText(t);
    //     const res = format(t, perLine);
    //     setFormatted(res.formated || (t ? '?' : ''));
    //     res.lines !== undefined && setNLines(res.lines);
    // }, []);

    return (
        <div className="pr-1">
            <button className="" onClick={() => setOpen((v) => !v)}>JSON beautifier...</button>
            {open &&
                <div className="">

                    <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                        <input
                            type="text"
                            className="my-2 w-full form-input text-xs text-inherit bg-slate-200 border-none rounded shadow"
                            spellCheck="false"
                            value={text}
                            onChange={(e) => {
                                const t = e.target.value;
                                setText(t);
                                const res = format(t, perLine);
                                setFormatted(res.formated || (t ? '?' : ''));
                                res.lines !== undefined && setNLines(res.lines);
                            }}
                        />

                        <div className="flex items-center gap-1 cursor-default" title="maximum number of characters per line">
                            <div className="select-none">#</div>

                            <input
                                type="text"
                                className="my-2 max-w-[64px] form-input text-xs text-center text-inherit bg-slate-200 border-none rounded shadow"
                                value={perLine}
                                onChange={(e) => {
                                    const t = e.target.value;
                                    const n = Number(t);
                                    if (!isNaN(n)) {
                                        setPerLine(n);
                                        const res = format(text, n);
                                        setFormatted(res.formated || (t ? '?' : ''));
                                        res.lines !== undefined && setNLines(res.lines);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {!!text.length &&
                        <div className="relative py-0.5 min-h-[2.6rem] bg-slate-200 rounded">

                            <div className="px-3 max-h-[460px] text-[.75rem] whitespace-pre overflow-auto">
                                {formatted}
                            </div>

                            <div className="absolute top-0.5 right-4 p-1 bg-slate-200 flex space-x-0.5">
                                <div className="px-2 py-1.5 text-xs border-slate-100 border rounded shadow">
                                    {nLines} line{nLines != 1 ? 's' : ''}
                                </div>

                                <button
                                    className="px-2 py-1.5 text-xs border-slate-400 border rounded shadow"
                                    onClick={() => {
                                        setText('');
                                    }}
                                >
                                    Clear
                                </button>

                                <button
                                    className="px-2 py-1.5 text-xs border-slate-400 border rounded shadow"
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(formatted);
                                    }}
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    }

                </div>
            }
        </div >
    );
}

//TODO: persist perLine
//TODO: persist text (useful for further investigation); or even to have history of values; or keep it simple so fars
//TODO: clear formated - done
//TODO: copy formated - done
