#!/bin/sh
PROFILE=@PROFILE@
IMAGE_VERSION=@IMAGE_VERSION@
IMAGE_REPO_URL="809695185788.dkr.ecr.ap-southeast-2.amazonaws.com/"
IMAGE_VERSION="latest"
IMAGE_APP_NAME="poc-miraen"
AWS_DEFAULT_REGION="ap-southeast-2"
I_PORT=3000


if [ "$PROFILE" = "dev" ]; then
    I_PORT=3000
elif [ "$PROFILE" = "prd" ]; then
    I_PORT=3000
fi

echo ${IMAGE_REPO_URL}${IMAGE_APP_NAME}:${IMAGE_VERSION}
sudo docker run \
-d \
-p${I_PORT}:3000 \
--name ${IMAGE_APP_NAME} \
${IMAGE_REPO_URL}${IMAGE_APP_NAME}:${IMAGE_VERSION} \
