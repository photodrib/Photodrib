using Buddy.BuddyService;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Security;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

public partial class Admin : System.Web.UI.Page
{
    private const string ADMINTOKEN = "UT-ccad4114-7013-4437-91d1-98d005d8a5d8";
  
    // load the page
    protected void Page_Load(object sender, EventArgs e)
    {
    }
    // handle the delete button clicking
    protected void DeleteButton_Click(object sender, EventArgs e)
    {
        string[] del = Request["del"].Split(',');
        HttpWebRequest req;
        HttpWebResponse resp;
        Hashtable users = new Hashtable();
        foreach (string s in del)
        {
            int p = s.LastIndexOf('+');
            users.Add(s.Substring(0, p), s.Substring(p + 1, s.Length - p - 1));
        }
        foreach (string user in users.Keys)
        {
            //make an HTTP request
            req = (HttpWebRequest)HttpWebRequest.Create("https://webservice.buddyplatform.com/Service/v1/BuddyService.ashx?"
                + "UserAccount_Profile_DeleteAccount&BuddyApplicationName=" + BuddyApplication.APPNAME
                + "&BuddyApplicationPassword=" + BuddyApplication.APPPASS
                + "&UserProfileID=" + users[user] + "&RESERVED=");
            resp = (HttpWebResponse)req.GetResponse();
            Membership.DeleteUser(user);
        }
        //redirect back
        Response.Redirect("Admin.aspx", true);
    }
    //connect the buddy api when loading the page
    protected void UserTable_Load(object sender, EventArgs e)
    {
        MembershipUserCollection users = Membership.GetAllUsers();
        sum.InnerHtml = "Totally " + users.Count + " user(s).<br /><br />";
        HtmlTableCell[] cells = new HtmlTableCell[4];
        HtmlTableRow row;
        HttpWebRequest req;
        HttpWebResponse resp;
        StreamReader s;
        string buddyUserID;
        foreach (MembershipUser user in users)
        {
            UserProfile profile = (UserProfile)UserProfile.Create(user.UserName);
            // making the request
            req = (HttpWebRequest)HttpWebRequest.Create("https://webservice.buddyplatform.com/Service/v1/BuddyService.ashx?"
                + "UserAccount_Profile_GetUserIDFromUserToken&BuddyApplicationName=" + BuddyApplication.APPNAME
                + "&BuddyApplicationPassword=" + BuddyApplication.APPPASS
                + "&UserToken=" + profile.BuddyToken + "&RESERVED=");
            resp = (HttpWebResponse)req.GetResponse();
            s = new StreamReader(resp.GetResponseStream());
            buddyUserID = s.ReadToEnd();
            s.Dispose();
            for (int i = 0; i < cells.Length; i++)
            {
                cells[i] = new HtmlTableCell();
            }
            cells[0].InnerHtml = "<input type=\"checkbox\" name=\"del\" value=\"" + user.UserName + "+" + buddyUserID + "\" />";
            cells[1].InnerText = user.UserName;
            cells[2].InnerText = profile.BuddyToken;
            cells[3].InnerText = buddyUserID;
            row = new HtmlTableRow();
            foreach (HtmlTableCell cell in cells)
            {
                row.Cells.Add(cell);
            }
            UserTable.Rows.Add(row);
        }
    }
}
