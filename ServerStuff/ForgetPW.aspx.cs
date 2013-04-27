using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Buddy;
using System.Web.Security;

using Buddy.BuddyService;
using System.Collections;
using System.Data;
using System.IO;
using System.Net;
using System.Threading;
using System.Web.UI.HtmlControls;
using System.Net.Mail; 


public partial class ForgetPW : System.Web.UI.Page
{
    // load the page
    protected void Page_Load(object sender, EventArgs e)
    {
    }
    // handle the click on reset password
    protected void resetPW_Click(object sender, EventArgs e)
    {
        var username = Request["username"];
        MembershipUser user;
        UserProfile profile;
        HttpWebRequest req;
        string newpw;
        MailMessage mailMessage; 

        try
        {
            user = Membership.GetUser(username);
        }
        catch (ArgumentException)
        {
            user = null;
        }
        if (user == null)
        {
            MessagePanel.Visible = true;
            MessageTitle.Attributes["class"] = "label label-important";
            MessageTitle.InnerText = "Error";
            Message.Text = "Invalid username";
            return;
        }
        // making the HTTP request and connect to the buddy server to reset the password
        profile = (UserProfile)UserProfile.Create(user.UserName);
        newpw = user.ResetPassword();
        string hashedPassword = HashString.GetHash(newpw, System.Security.Cryptography.SHA1.Create());
        req = (HttpWebRequest)HttpWebRequest.Create("https://webservice.buddyplatform.com/Service/v1/BuddyService.ashx?"
            + "UserAccount_Profile_Update&BuddyApplicationName=" + BuddyApplication.APPNAME
            + "&BuddyApplicationPassword=" + BuddyApplication.APPPASS
            + "&UserToken=" + profile.BuddyToken
            + "&UserName="
            + "&UserSuppliedPassword=" + hashedPassword
            + "&UserGender=&UserAge=&UserEmail=&StatusID=&FuzzLocationEnabled="
            + "&CelebModeEnabled=&ApplicationTag="
            + "&RESERVED=");
        try
        {
            req.GetResponse();
        }
        catch (WebException)
        {
            MessagePanel.Visible = true;
            MessageTitle.Attributes["class"] = "label label-important";
            MessageTitle.InnerText = "Error";
            Message.Text = "Cannot connect to the server. Please try again later";
            return;
        }
        // sent the reset email to the email signed by the user
        mailMessage = new MailMessage();
        mailMessage.From = new MailAddress("admin@photodrib.com", "Photodrib Admin");
        mailMessage.To.Add(user.Email);
        mailMessage.Subject = "<Photodrib> Reset Password";
        mailMessage.IsBodyHtml = true;
        mailMessage.Body = "Hello " + profile.FirstName + " " + profile.LastName + ",<br /><br />Your new password is <b style=\"color:#f00;\">" + newpw + "</b>";
        SmtpClient smtpClient = new SmtpClient("smtp.live.com", 587);
        smtpClient.UseDefaultCredentials = false;
        smtpClient.Credentials = new NetworkCredential("admin@photodrib.com", "photodrib");
        smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
        smtpClient.EnableSsl = true;
        try
        {
            smtpClient.Send(mailMessage);
        }
        catch (Exception)
        {
            MessagePanel.Visible = true;
            MessageTitle.Attributes["class"] = "label label-important";
            MessageTitle.InnerText = "Error";
            Message.Text = "Unknown error. Please try again later";
            return;
        }
        MessagePanel.Visible = true;
        MessageTitle.Attributes["class"] = "label label-success";
        MessageTitle.InnerText = "Success";
        Message.Text = "An email with the new password has been sent to your email address.";
    }
}
