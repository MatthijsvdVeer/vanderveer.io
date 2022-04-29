---
title: Add An Access Policy To Azure Key Vault In Bicep
date: "2022-04-29T12:00:00.000Z"
description: "How to add an access policy to Azure Keyvault from a different Bicep module."
---

I was banging my head against the wall for a bit when I needed to add an access policy to an existing Key Vault through Bicep. When trying to add an access policy for a system assigned identity of my app service, I got stuck on the name property of the policy:
```
resource keyVaultAccessPolicy 'Microsoft.KeyVault/vaults/accessPolicies@2021-11-01-preview' = {
  name: 'policy'
  properties: {
    accessPolicies: [
      // access policies excluded
    ]
  }
}
```
Luckily, the VS Code extension for Bicep came up with a helpful error:
> **Expected resource name to contain 1 "/" character(s). The number of name segments must match the number of segments in the resource type.**

You might recognize this error from other resources. The error hints at the fact that this resource depends on a parent resource. So I included the parent Key Vault in the name:
```
resource keyVaultAccessPolicy 'Microsoft.KeyVault/vaults/accessPolicies@2021-11-01-preview' = {
  name: '${keyVaultName}/policy'
  properties: {
    accessPolicies: [
      // access policies excluded
    ]
  }
}
```
The extension shows no errors, so it's deployment time! The deployment failed with the following error:
> **Access policies operation not permitted. Allowed operations are "add", "replace", and "remove"**
I tried searching for this error, with a whopping 4 results, none of them helpful. There is no *operation* property on this template, so why is it complaining it didn't fall into the desired range? After a few iterations I tried putting the *add* operation in the name instead, and voila! This works, I included the entire access policy for adding my App Service identity to Key Vault.

```
resource keyVaultAccessPolicy 'Microsoft.KeyVault/vaults/accessPolicies@2021-11-01-preview' = {
  name: '${keyVaultName}/add'
  properties: {
    accessPolicies: [
      {
        objectId: appService.identity.principalId
        tenantId: appService.identity.tenantId
        permissions: {
          secrets: [
            'get'
            'list'
          ]
        }
      }
    ]
  }
}
```