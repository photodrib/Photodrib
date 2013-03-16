using Buddy.BuddyService;
using System;
using System.Data;
using System.Threading;
using System.Web.Security;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

public partial class Admin : System.Web.UI.Page
{
    private const string ADMINTOKEN = "UT-ccad4114-7013-4437-91d1-98d005d8a5d8";
    public string buddyUserID;
    private ManualResetEvent buddyEvent;

    protected void Page_Load(object sender, EventArgs e)
    {
    }

    protected void DeleteButton_Click(object sender, EventArgs e)
    {

    }

    private void BuddyGetUserIDCallback(object sender, UserAccount_Profile_GetUserIDFromUserTokenCompletedEventArgs e)
    {
        buddyUserID = e.Result;
        ManualResetEvent waitEvent = Interlocked.CompareExchange(ref buddyEvent, null, null);
        waitEvent.Set();
        Trace.Write("Buddy Completed");
    }

    private void BuddyDeleteUserCallback(object sender, UserAccount_Profile_DeleteAccountCompletedEventArgs e)
    {
    }

    protected void UserTable_Load(object sender, EventArgs e)
    {
        BuddyServiceClient client = new BuddyServiceClient(BuddyServiceClient.EndpointConfiguration.soap);
        client.UserAccount_Profile_GetUserIDFromUserTokenCompleted += new EventHandler<UserAccount_Profile_GetUserIDFromUserTokenCompletedEventArgs>(BuddyGetUserIDCallback);
        client.UserAccount_Profile_DeleteAccountCompleted += new EventHandler<UserAccount_Profile_DeleteAccountCompletedEventArgs>(BuddyDeleteUserCallback);
        MembershipUserCollection users = Membership.GetAllUsers();
        sum.InnerHtml = "Totally " + users.Count + " user(s).<br /><br />";
        HtmlTableCell[] cells = new HtmlTableCell[4];
        HtmlTableRow row;
        foreach (MembershipUser user in users)
        {
            UserProfile profile = (UserProfile)UserProfile.Create(user.UserName);
            buddyEvent = new ManualResetEvent(false);
            client.UserAccount_Profile_GetUserIDFromUserTokenAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, profile.BuddyToken, null);
            //buddyEvent.WaitOne();
            for (int i = 0; i < cells.Length; i++)
            {
                cells[i] = new HtmlTableCell();
            }
            cells[0].InnerHtml = "<input type=\"checkbox\" name=\"del\" value=\"" + buddyUserID + "\" />";
            cells[1].InnerText = user.UserName;
            cells[2].InnerText = profile.BuddyToken;
            cells[3].InnerText = buddyUserID;
            row = new HtmlTableRow();
            foreach (HtmlTableCell cell in cells)
            {
                row.Cells.Add(cell);
            }
            UserTable.Rows.Add(row);
            //client.Service.UserAccount_Profile_DeleteAccountAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUserID, null);
            //Membership.DeleteUser(user.UserName);
        }
    }
}
