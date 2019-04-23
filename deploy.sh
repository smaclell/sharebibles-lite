expo publish --release-channel prod-v32 --non-interactive

expo build:android --release-channel prod-v32 --non-interactive --no-publish
curl -o /personal/lite-secrets/releases/sb.1.3.0.apk "$(expo url:apk --non-interactive)"

# On the next build use --clear-push-cert
expo build:ios --release-channel prod-v32 --non-interactive --no-publish
curl -o /personal/lite-secrets/releases/sb.1.3.0.ipa "$(expo url:ipa --non-interactive)"

