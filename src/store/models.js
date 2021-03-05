import DeliverableSlaDefinitionModel from "./models/Sla/DeliverableSlaDefinitionModel";
import DeliverableSlaModel from "./models/Sla/DeliverableSlaModel";

import UserModel from "./models/Sla/UserModel"
import UserSettingModel from "./models/Sla/UserSettingModel"
import PermissionModel from "./models/Sla/PermissionModel"
import SlaDefinitionStatusModel from "@/store/models/Sla/SlaDefinitionStatusModel";
import SlaStatisticModel from "@/store/models/Sla/SlaStatisticModel";

export default {
    DeliverableSlaDefinitionModel: DeliverableSlaDefinitionModel,
    DeliverableSlaModel: DeliverableSlaModel,
    SlaDefinitionStatusModel: SlaDefinitionStatusModel,
    SlaStatisticModel: SlaStatisticModel,

    UserModel: UserModel,
    UserSettingModel: UserSettingModel,
    PermissionModel: PermissionModel
}
