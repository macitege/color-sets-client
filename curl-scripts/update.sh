curl "https://color-sets-api.herokuapp.com/colors/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "color": {
      "hex": "'"${HEX}"'",
      "rgba": "'"${RGBA}"'",
      "hsla": "'"${HSLA}"'",
      "user_id": "'"${USER_ID}"'"
    }
  }'

echo
