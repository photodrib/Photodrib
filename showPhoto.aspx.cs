using System;
using Buddy;
using Buddy.BuddyService;
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

public partial class Edit : System.Web.UI.Page
{
    int photo_id;
    AuthenticatedUser buddyUser;

    protected void Page_Load(object sender, EventArgs e)
    {
        buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {

        }
        if (!Profile.IsAnonymous)
            Response.Cookies.Add(new HttpCookie("p", Profile.Tiles)
            {
                Expires = DateTime.Now.AddDays(30)
            });
        try
        {
            photo_id = int.Parse(Request["photo_id"]);
        }
        catch (Exception)
        {
            
        }

    }

    private bool IsCombinedJSOlder(string path)
    {
        var jsPath = Context.Server.MapPath(path);
        string[] files = Directory.GetFiles(jsPath);

        var combinedFileLastWrite = File.GetLastWriteTime(Server.MapPath("~/js/Combined.js"));

        return Array.Exists(files, file => (File.GetLastWriteTime(file) - combinedFileLastWrite).TotalSeconds > 1);
    }

    protected string GetAlerts()
    {
        if (!Request.IsLocal)
        {
            if (IsCombinedJSOlder("~/js/") || IsCombinedJSOlder("~/Tiles/"))
            {
                return "$('#CombinedScriptAlert').show();";
            }
            else
            {
                return string.Empty;
            }
        }
        else
        {
            return string.Empty;
        }

    }

    protected Picture GetPhoto() 
    {
        var task = buddyUser.GetPicture(photo_id);
        task.Wait();
        if (task.IsCanceled || task.IsFaulted) return null;
        return task.Result;
    }



}