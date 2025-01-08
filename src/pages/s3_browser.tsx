import { StorageBrowser } from "@aws-amplify/ui-react-storage";
import DistributionURLBar from "../components/distributionButton";

function S3Browser() {
  return (
    <div className="pt-3">
      <DistributionURLBar />
      <StorageBrowser
        displayText={{
          LocationsView: {
            title: "Storage Browser for S3",
          },
        }}
      />
    </div>
  );
}

export default S3Browser;
