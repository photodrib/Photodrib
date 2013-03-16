using System;

public partial class SaveTiles : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var cookie = Request.Cookies["p"];
        Profile.Tiles = cookie.Value;
        Profile.Save();
    }
}
