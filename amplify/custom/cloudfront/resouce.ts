import { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { CfnOutput } from "aws-cdk-lib";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";

// custom cloud front stack with amplify gen 2 storage
export class CustomCloudfrontAmplifyGen2 extends Construct {
  public readonly distribution: cloudfront.Distribution;
  constructor(scope: Construct, id: string, bucket: IBucket) {
    super(scope, id);

    this.distribution = new cloudfront.Distribution(scope, "s3CloudFront", {
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessIdentity(bucket),
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/sorry.html",
        },
      ],
    });

    new BucketDeployment(scope,"DeploySorryPage", {
        sources: [Source.asset("./public/sorry")],
        destinationBucket: bucket,
        distribution: this.distribution,
        retainOnDelete: false,
        prune: false
    })

    new CfnOutput(scope, "CloudfrontDistributionUrl", {
      value: this.distribution.distributionDomainName,
    });
  }
}
