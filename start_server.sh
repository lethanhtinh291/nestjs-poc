#!/bin/sh
PROFILE=@PROFILE@
PROJ_NAME=@PROJ_NAME@
IMAGE_VERSION=@IMAGE_VERSION@
AWS_ACCOUNT_ID=@AWS_ACCOUNT_ID@
AWS_DEFAULT_REGION=@AWS_DEFAULT_REGION@

REPOSITORY_URL_TAG=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/poc-miraen/api-poc-miraen:${PROFILE}_${IMAGE_VERSION}

if [ "$PROFILE" = "dev" ]; then
    I_PORT=3000
elif [ "$PROFILE" = "prd" ]; then
    I_PORT=3000
fi

sudo docker run \
-d \
-p ${I_PORT}:3000 \
--name ${PROJ_NAME} \
${REPOSITORY_URL_TAG}
