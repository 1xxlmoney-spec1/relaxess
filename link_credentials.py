#!/usr/bin/env python3
"""Link uploaded iOS credentials to the EAS app."""
import json
import sys
import requests

EXPO_TOKEN = "f0fUeZV64Cc9a0tKIIMNXyQxeIVquCFzpa4xqNpl"
CERT_ID = "7fe8f63e-076a-4549-82d2-82c4d592c41c"
PROFILE_ID = "e37832f2-ceb1-4d19-87b2-c4c613894f23"
IOS_APP_CREDENTIALS_ID = "6b537cdb-7bc7-404c-b38d-61d4d603aa90"

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

# Step 1: Use existing IosAppCredentials
print("Step 1: Using existing IosAppCredentials...")
ios_app_credentials_id = IOS_APP_CREDENTIALS_ID
print(f"  ID: {ios_app_credentials_id}")

# Step 2: Create IosAppBuildCredentials with cert and profile
print("\nStep 2: Creating IosAppBuildCredentials...")
create_build_creds_mutation = """
mutation CreateIosAppBuildCredentials($iosAppCredentialsId: ID!, $iosAppBuildCredentialsInput: IosAppBuildCredentialsInput!) {
  iosAppBuildCredentials {
    createIosAppBuildCredentials(
      iosAppCredentialsId: $iosAppCredentialsId
      iosAppBuildCredentialsInput: $iosAppBuildCredentialsInput
    ) {
      id
      iosDistributionType
    }
  }
}
"""
build_creds_result = graphql(create_build_creds_mutation, {
    "iosAppCredentialsId": ios_app_credentials_id,
    "iosAppBuildCredentialsInput": {
        "iosDistributionType": "DEVELOPMENT",
        "distributionCertificateId": CERT_ID,
        "provisioningProfileId": PROFILE_ID,
    },
})
build_creds_id = build_creds_result["iosAppBuildCredentials"]["createIosAppBuildCredentials"]["id"]
print(f"  IosAppBuildCredentials created: {build_creds_id}")

print("\n✓ All credentials linked successfully!")
print(f"  IosAppCredentials ID: {ios_app_credentials_id}")
print(f"  IosAppBuildCredentials ID: {build_creds_id}")
print("  Distribution type: DEVELOPMENT")
