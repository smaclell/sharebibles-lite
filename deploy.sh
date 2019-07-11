expo publish --release-channel prod-v33 --non-interactive

expo build:android --release-channel prod-v33 --non-interactive --no-publish
curl -o /personal/lite-secrets/releases/sb.1.3.1.apk "$(expo url:apk --non-interactive)"

# On the next build use --clear-push-cert
expo build:ios --release-channel prod-v33 --non-interactive --no-publish
curl -o /personal/lite-secrets/releases/sb.1.3.1.ipa "$(expo url:ipa --non-interactive)"

