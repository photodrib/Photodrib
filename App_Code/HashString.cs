using System;
using System.Security.Cryptography;
using System.Text;

/// <summary>
/// Generate the hash value of a string in form of a hexadecimal string or
/// verify a string against its hash value of hexadecimal string
/// </summary>
public class HashString
{
    public static string GetHash(string input, HashAlgorithm hash)
    {
        byte[] data = hash.ComputeHash(Encoding.UTF8.GetBytes(input));

        StringBuilder sBuilder = new StringBuilder();
        for (int i = 0; i < data.Length; i++)
        {
            sBuilder.Append(data[i].ToString("x2"));
        }
        return sBuilder.ToString();
    }

    public static bool VerifyHash(string input, string hashValue, HashAlgorithm hash)
    {
        return hashValue.Equals(GetHash(input, hash), StringComparison.OrdinalIgnoreCase);
    }
}