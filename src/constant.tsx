import S3Browser from "./pages/s3_browser";
import { TRoute } from "./type";

export const MY_ROUTES: TRoute = [
  {
    path: "/s3",
    title: "Storage Browser",
    component: <S3Browser/>
  }
];

