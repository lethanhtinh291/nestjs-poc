#!/bin/sh
PROFILE=@PROFILE@
PROJ_NAME=@PROJ_NAME@
COMPANY_NAME=@COMPANY_NAME@
TAG_VERSION=@TAG_VERSION@
AWS_ACCOUNT_ID=@AWS_ACCOUNT_ID@
AWS_DEFAULT_REGION=@AWS_DEFAULT_REGION@

REPOSITORY_URL_TAG=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/private-ecr-${COMPANY_NAME}-${PROJ_NAME}:${PROFILE}_${TAG_VERSION}

if [ "$PROFILE" = "dev" ]; then
    I_PORT=3000
elif [ "$PROFILE" = "prd" ]; then
    I_PORT=3000
fi

sudo docker run \
-d \
-p ${I_PORT}:3000 \
--env-file /home/ec2-user/.env \
--name ${PROJ_NAME} \
${REPOSITORY_URL_TAG}
