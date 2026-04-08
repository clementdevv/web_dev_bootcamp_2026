
#!/bin/bash

echo "🔍 TESTING EXPRESS ROUTER & COOKIES"
echo "=================================="

BASE_URL="http://localhost:3000"

# Test 1: Basic routes
echo -e "\n📝 Test 1: Basic Routes"
curl -s $BASE_URL/users/profile | jq '.message'
curl -s $BASE_URL/products | jq '.count'

# Test 2: Router organization
echo -e "\n📝 Test 2: Router Organization"
curl -s $BASE_URL/api/v1/users | jq '.version'
curl -s $BASE_URL/api/v2/users | jq '.version'

# Test 3: Cookie setting and reading
echo -e "\n📝 Test 3: Cookie Operations"
curl -c cookies.txt -s $BASE_URL/users/cookies-demo/session
curl -b cookies.txt -s $BASE_URL/users/cookies | jq '.cookies | keys'

# Test 4: Signed cookies
echo -e "\n📝 Test 4: Signed Cookies"
curl -c signed.txt -s $BASE_URL/signed-cookies/signed
curl -b signed.txt -s $BASE_URL/signed-cookies/read | jq '.signedCookies'

# Test 5: Authentication middleware
echo -e "\n📝 Test 5: Auth Middleware"
curl -s $BASE_URL/admin/dashboard | jq '.error'
curl -s -H "Authorization: secret123" $BASE_URL/admin/dashboard | jq '.message'

# Test 6: Rate limiting
echo -e "\n📝 Test 6: Rate Limiting"
for i in {1..12}; do
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/api/v1/users)
  if [ $RESPONSE -eq 429 ]; then
    echo "   ✅ Rate limit triggered after $i requests"
    break
  fi
done

# Test 7: Cookie options
echo -e "\n📝 Test 7: Cookie Options"
curl -s $BASE_URL/users/cookies-demo/multiple
curl -b cookies.txt $BASE_URL/users/cookies | jq '.cookies | length'

# Cleanup
rm cookies.txt signed.txt

echo -e "\n✅ All cURL tests completed!"

