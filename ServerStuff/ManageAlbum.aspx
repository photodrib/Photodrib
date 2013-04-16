<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ManageAlbum.aspx.cs" Inherits="ServerStuff_ManageAlbum" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>ManageAlbum</title>
</head>
<body>
    <form id="form1" runat="server">
        <table id="AlbumTable" onload="AlbumTable_Load" runat="server">
            <tr>
                <th></th>
                <th>AlbumName</th>
                <th>PhotoCount</th>
            </tr>
        </table>
        <asp:Button ID="DeleteButton" OnClick="DeleteButton_Click" runat="server" Text="Delete" />
    </form>
</body>
</html>
