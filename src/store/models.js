import DeliverableSlaDefinitionModel from "./models/Sla/DeliverableSlaDefinitionModel";
import DeliverableSlaModel from "./models/Sla/DeliverableSlaModel";

import UserModel from "./models/Sla/UserModel"
import UserSettingModel from "./models/Sla/UserSettingModel"
import PermissionModel from "./models/Sla/PermissionModel"

import EtlDefinitionModel from "@/store/models/Etl/EtlDefinitionModel";
import AutomicEtlDefinitionModel from "@/store/models/Etl/AutomicEtlDefinitionModel";
import EtlExecutionModel from "@/store/models/Etl/EtlExecutionModel";
import AutomicEtlExecutionModel from "@/store/models/Etl/AutomicEtlExecutionModel";

import SlaDefinitionLifecycleModel from "@/store/models/Sla/SlaDefinitionLifecycleModel";
import SlaStatisticModel from "@/store/models/Sla/SlaStatisticModel";
import SlaDefinitionStatisticModel from "@/store/models/Sla/SlaDefinitionStatisticModel";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";
import AvailabilitySlaModel from "@/store/models/Sla/AvailabilitySlaModel";
import AvailabilitySlaStatisticModel from "@/store/models/Sla/AvailabilitySlaStatisticModel";
import DeliverableSlaStatisticModel from "@/store/models/Sla/DeliverableSlaStatisticModel";
import EtlDefinitionStatisticModel from "@/store/models/Etl/EtlDefinitionStatisticModel";
import SlaModel from "@/store/models/Sla/SlaModel";
import SlaAchievementConditionModel from "@/store/models/Sla/SlaAchievementConditionModel";
import DeliverableSlaProgressModel from "@/store/models/Sla/DeliverableSlaProgressModel";
import AvailabilitySlaProgressModel from "@/store/models/Sla/AvailabilitySlaProgressModel";
import TimerangeModel from "@/store/models/Sla/TimerangeModel";
import WeeklyTimerangeModel from "@/store/models/Sla/WeeklyTimerangeModel";
import DailyTimerangeModel from "@/store/models/Sla/DailyTimerangeModel";
import EtlDefinitionDependsonPivotModel from "@/store/models/Etl/Pivot/EtlDefinitionDependsonPivotModel";
import SlaDefinitionTagModel from "@/store/models/Sla/SlaDefinitionTagModel";
import SlaDefinitionTagPivotModel from "@/store/models/Sla/Pivot/SlaDefinitionTagPivotModel";

export default {
    EtlDefinitionDependsonPivotModel: EtlDefinitionDependsonPivotModel,
    EtlDefinitionModel: EtlDefinitionModel,
    EtlDefinitionStatisticModel: EtlDefinitionStatisticModel,
    AutomicEtlDefinitionModel: AutomicEtlDefinitionModel,

    EtlExecutionModel: EtlExecutionModel,
    AutomicEtlExecutionModel: AutomicEtlExecutionModel,

    TimerangeModel: TimerangeModel,
    DailyTimerangeModel: DailyTimerangeModel,
    WeeklyTimerangeModel: WeeklyTimerangeModel,

    SlaDefinitionTagModel: SlaDefinitionTagModel,
    SlaDefinitionTagPivotModel: SlaDefinitionTagPivotModel,
    SlaModel: SlaModel,
    SlaAchievementConditionModel: SlaAchievementConditionModel,

    DeliverableSlaDefinitionModel: DeliverableSlaDefinitionModel,
    DeliverableSlaModel: DeliverableSlaModel,
    DeliverableSlaStatisticModel: DeliverableSlaStatisticModel,
    DeliverableSlaProgressModel: DeliverableSlaProgressModel,

    AvailabilitySlaDefinitionModel: AvailabilitySlaDefinitionModel,
    AvailabilitySlaModel: AvailabilitySlaModel,
    AvailabilitySlaStatisticModel: AvailabilitySlaStatisticModel,
    AvailabilitySlaProgressModel: AvailabilitySlaProgressModel,

    SlaDefinitionLifecycleModel: SlaDefinitionLifecycleModel,
    SlaStatisticModel: SlaStatisticModel,
    SlaDefinitionStatisticModel: SlaDefinitionStatisticModel,

    UserModel: UserModel,
    UserSettingModel: UserSettingModel,
    PermissionModel: PermissionModel
}
