using Buddy;
using System;
using System.Web.Security;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void LoginButton_Click(object sender, EventArgs e)
    {
        var username = Request["username"];
        var password = Request["password"];
        var rememberMe = Convert.ToBoolean(Request["remember"] == "on");
        string hashedPassword = HashString.GetHash(password, System.Security.Cryptography.SHA1.Create());
        BuddyClient client = BuddyApplication.Create();
        var buddyResp = client.Login(username, hashedPassword, null);
        AuthenticatedUser buddyUser = null;
        try
        {
            buddyUser = buddyResp.Result;
        }
        catch (AggregateException) { }
        if (Membership.ValidateUser(username, password) && buddyResp.Status == System.Threading.Tasks.TaskStatus.RanToCompletion)
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
