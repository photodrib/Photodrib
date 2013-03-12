<%@ WebHandler Language="C#" Class="DelAllUsers" %>

using System;
using System.Web;
using System.Web.Security;

public class DelAllUsers : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        MembershipUserCollection users = Membership.GetAllUsers();
        context.Response.Write("Totally " + users.Count + " user(s).<br /><br />");
        foreach (MembershipUser user in users)
        {
            Membership.DeleteUser(user.UserName);
            context.Response.Write("User " + user.UserName + " deleted.<br />");
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}
