import * as iam from "aws-cdk-lib/aws-iam";
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { storage } from "./storage/resource";
import { CustomCloudfrontAmplifyGen2 } from "./custom/cloudfront/resouce";

const backend = defineBackend({
  auth,
  storage,
});

const cfStack = backend.createStack("CustomCloudfrontStack");
const cfStackOutput = new CustomCloudfrontAmplifyGen2(
  cfStack,
  "CustomCloudfrontStack",
  backend.storage.resources.bucket
);

backend.storage.resources.bucket.addToResourcePolicy(
  new iam.PolicyStatement({
    actions: ["s3:GetObject"],
    effect: iam.Effect.ALLOW,
    principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
    sid: "AllowCloudFront",
    resources: [`${backend.storage.resources.bucket.bucketArn}/*`],
    conditions: {
      StringEquals: {
        "AWS:SourceArn": `arn:aws:cloudfront::\${aws:accountId}:distribution/${cfStackOutput.distribution}`,
      },
    },
  })
);

backend.storage.resources.bucket

backend.addOutput({
  custom: {
    cloudfrontUrl: `https://${cfStackOutput.distribution.domainName}`
  },
});
