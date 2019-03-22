curl "https://color-sets-api.herokuapp.com/colors/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \


echo
