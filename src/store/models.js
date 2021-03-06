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
import AvailabilitySlaStatisticModel from "@/store/models/Sla/AvailabilitySlaStatisticModel";
import DeliverableSlaStatisticModel from "@/store/models/Sla/DeliverableSlaStatisticModel";

export default {
    DeliverableSlaDefinitionModel: DeliverableSlaDefinitionModel,
    DeliverableSlaModel: DeliverableSlaModel,
    DeliverableSlaStatisticModel: DeliverableSlaStatisticModel,
    AvailabilitySlaDefinitionModel: AvailabilitySlaDefinitionModel,
    AvailabilitySlaModel: AvailabilitySlaModel,
    AvailabilitySlaStatisticModel: AvailabilitySlaStatisticModel,
    SlaDefinitionStatusModel: SlaDefinitionStatusModel,
    SlaStatisticModel: SlaStatisticModel,
    SlaDefinitionStatisticModel: SlaDefinitionStatisticModel,

    UserModel: UserModel,
    UserSettingModel: UserSettingModel,
    PermissionModel: PermissionModel
}
