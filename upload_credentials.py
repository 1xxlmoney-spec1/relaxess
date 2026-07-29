#!/usr/bin/env python3
"""Upload iOS credentials to EAS via GraphQL API."""
import base64
import json
import sys
import requests

EXPO_TOKEN = "f0fUeZV64Cc9a0tKIIMNXyQxeIVquCFzpa4xqNpl"
APP_ID = "8cfc1452-6246-4f48-8750-43b8d3631c43"
ACCOUNT_ID = "ef4e92b3-9b91-4a17-af77-1df34fe8d9ef"  # nicksess account
TEAM_ID = "RHU6NV64UL"
BUNDLE_ID = "com.mykolakubryakov.relaxess"

headers = {
    "Authorization": f"Bearer {EXPO_TOKEN}",
    "Content-Type": "application/json",
}

def graphql(query, variables=None):
    resp = requests.post(
        "https://api.expo.dev/graphql",
        headers=headers,
        json={"query": query, "variables": variables or {}},
    )
    data = resp.json()
    if "errors" in data:
        print("GraphQL errors:", json.dumps(data["errors"], indent=2))
        sys.exit(1)
    return data["data"]

# Read files
with open("ios_development.p12", "rb") as f:
    cert_b64 = base64.b64encode(f.read()).decode()

with open("Relaxess.mobileprovision", "rb") as f:
    profile_b64 = base64.b64encode(f.read()).decode()

print("✓ Files read successfully")

# Step 1: Create Apple Team
print("\nStep 1: Creating Apple Team...")
team_mutation = """
mutation CreateAppleTeam($accountId: ID!, $appleTeamInput: AppleTeamInput!) {
  appleTeam {
    createAppleTeam(accountId: $accountId, appleTeamInput: $appleTeamInput) {
      id
      appleTeamIdentifier
      appleTeamName
    }
  }
}
"""
team_result = graphql(team_mutation, {
    "accountId": ACCOUNT_ID,
    "appleTeamInput": {
        "appleTeamIdentifier": TEAM_ID,
        "appleTeamName": "Personal Team",
    }
})
team_internal_id = team_result["appleTeam"]["createAppleTeam"]["id"]
print(f"✓ Apple Team created: {team_internal_id}")

# Step 2: Create Apple App Identifier
print("\nStep 2: Creating Apple App Identifier...")
app_id_mutation = """
mutation CreateAppleAppIdentifier($accountId: ID!, $appleAppIdentifierInput: AppleAppIdentifierInput!) {
  appleAppIdentifier {
    createAppleAppIdentifier(accountId: $accountId, appleAppIdentifierInput: $appleAppIdentifierInput) {
      id
      bundleIdentifier
    }
  }
}
"""
app_id_result = graphql(app_id_mutation, {
    "accountId": ACCOUNT_ID,
    "appleAppIdentifierInput": {
        "bundleIdentifier": BUNDLE_ID,
        "appleTeamId": team_internal_id,
    }
})
apple_app_identifier_id = app_id_result["appleAppIdentifier"]["createAppleAppIdentifier"]["id"]
print(f"✓ Apple App Identifier created: {apple_app_identifier_id}")

# Step 3: Upload distribution certificate
print("\nStep 3: Uploading distribution certificate...")
cert_mutation = """
mutation CreateAppleDistributionCertificate($accountId: ID!, $appleDistributionCertificateInput: AppleDistributionCertificateInput!) {
  appleDistributionCertificate {
    createAppleDistributionCertificate(accountId: $accountId, appleDistributionCertificateInput: $appleDistributionCertificateInput) {
      id
    }
  }
}
"""
cert_result = graphql(cert_mutation, {
    "accountId": ACCOUNT_ID,
    "appleDistributionCertificateInput": {
        "certP12": cert_b64,
        "certPassword": "",
        "appleTeamId": team_internal_id,
    }
})
cert_id = cert_result["appleDistributionCertificate"]["createAppleDistributionCertificate"]["id"]
print(f"✓ Certificate uploaded: {cert_id}")

# Step 4: Upload provisioning profile
print("\nStep 4: Uploading provisioning profile...")
profile_mutation = """
mutation CreateAppleProvisioningProfile(
  $accountId: ID!
  $appleAppIdentifierId: ID!
  $appleProvisioningProfileInput: AppleProvisioningProfileInput!
) {
  appleProvisioningProfile {
    createAppleProvisioningProfile(
      accountId: $accountId
      appleAppIdentifierId: $appleAppIdentifierId
      appleProvisioningProfileInput: $appleProvisioningProfileInput
    ) {
      id
      expiration
      developerPortalIdentifier
    }
  }
}
"""
profile_result = graphql(profile_mutation, {
    "accountId": ACCOUNT_ID,
    "appleAppIdentifierId": apple_app_identifier_id,
    "appleProvisioningProfileInput": {
        "appleProvisioningProfile": profile_b64,
    }
})
profile_id = profile_result["appleProvisioningProfile"]["createAppleProvisioningProfile"]["id"]
print(f"✓ Provisioning profile uploaded: {profile_id}")

print("\n✓ All credentials uploaded successfully!")
print(f"  Apple Team ID: {team_internal_id}")
print(f"  Apple App Identifier ID: {apple_app_identifier_id}")
print(f"  Certificate ID: {cert_id}")
print(f"  Profile ID: {profile_id}")
