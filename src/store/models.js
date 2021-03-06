import DeliverableSlaDefinitionModel from "./models/Sla/DeliverableSlaDefinitionModel";
import DeliverableSlaModel from "./models/Sla/DeliverableSlaModel";

import UserModel from "./models/Sla/UserModel"
import UserSettingModel from "./models/Sla/UserSettingModel"
import PermissionModel from "./models/Sla/PermissionModel"
import SlaDefinitionStatusModel from "@/store/models/Sla/SlaDefinitionStatusModel";
import SlaStatisticModel from "@/store/models/Sla/SlaStatisticModel";
import SlaDefinitionStatisticModel from "@/store/models/Sla/SlaDefinitionStatisticModel";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";
import AvailabilitySlaModel from "@/store/models/Sla/AvailabilitySlaModel";

export default {
    DeliverableSlaDefinitionModel: DeliverableSlaDefinitionModel,
    DeliverableSlaModel: DeliverableSlaModel,
    AvailabilitySlaDefinitionModel: AvailabilitySlaDefinitionModel,
    AvailabilitySlaModel: AvailabilitySlaModel,
    SlaDefinitionStatusModel: SlaDefinitionStatusModel,
    SlaStatisticModel: SlaStatisticModel,
    SlaDefinitionStatisticModel: SlaDefinitionStatisticModel,

    UserModel: UserModel,
    UserSettingModel: UserSettingModel,
    PermissionModel: PermissionModel
}
