using Buddy;
using System;
using System.Web.Security;

public partial class Login : System.Web.UI.Page
{
    // load the page
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    // handle the login button clicked
    protected void LoginButton_Click(object sender, EventArgs e)
    {
        // generate and send the request with username and password to the buddy server
        var username = Request["username"];
        var password = Request["password"];
        var rememberMe = Convert.ToBoolean(Request["remember"] == "on");
        string hashedPassword = HashString.GetHash(password, System.Security.Cryptography.SHA1.Create());
        BuddyClient client = BuddyApplication.Create();
        var buddyResp = client.Login(username, hashedPassword, null);
        try
        {
            buddyResp.Wait();
        }
        catch (Exception)
        {
            MessagePanel.Visible = true;
            Message.Text = "Cannot connect to the server";
            return;
        }
        AuthenticatedUser buddyUser = null;
        // get the result back
        try
        {
            buddyUser = buddyResp.Result;
        }
            // handle the session
        catch (AggregateException) { }
        if (Membership.ValidateUser(username, password) && !buddyResp.IsCanceled && !buddyResp.IsFaulted)
        {
            Session["buddyUser"] = buddyUser;
            Response.Cookies.Add(FormsAuthentication.GetAuthCookie(username, rememberMe));
            Response.Redirect("Breakout.aspx");
        }
        else
        {
            MessagePanel.Visible = true;
            Message.Text = "Invalid username or password";
        }
    }
}
