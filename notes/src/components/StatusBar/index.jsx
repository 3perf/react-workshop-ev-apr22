import { observer } from "mobx-react-lite";
import DarkModeInfo from "../DarkModeInfo";
import PublishingTo from "../PublishingTo";

function StatusBar({ store }) {
  return (
    <>
      <PublishingTo
        publishingTarget={store.publishingConfig.target}
        onPublishingTargetChange={(newTarget) => {
          store.setPublishingTarget(newTarget);
        }}
      />{" "}
      · <DarkModeInfo /> · Status: {store.status}
    </>
  );
}

export default observer(StatusBar);
