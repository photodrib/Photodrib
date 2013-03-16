<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Admin.aspx.cs" Async="true" Inherits="Admin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Admin</title>
</head>
<body>
    <form id="form1" runat="server">
        <span id="sum" runat="server"></span>
        <table id="UserTable" onload="UserTable_Load" runat="server">
            <tr>
                <th></th>
                <th>Username</th>
                <th>Buddy User Token</th>
                <th>Buddy User ID</th>
            </tr>
        </table>
        <asp:Button ID="DeleteButton" OnClick="DeleteButton_Click" runat="server" Text="Delete" />
    </form>
</body>
</html>
