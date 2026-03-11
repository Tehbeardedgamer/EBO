# Binding Map — HRC_AHU_B_NV_MODE_DETERMINATION

## Inputs

### Hardwired / operator / software inputs

| Script Input | Type | Bind To |
|---|---|---|
| UNIT_ENABLE | Software | BV/AV UNIT_ENABLE |
| OCC_CMD | Software | BV/AV OCC_CMD |
| FIRE_ALARM | Hardwired input | FIRE_ALARM |
| VAULT_H20_DETECT | Hardwired input | VAULT_H20_DETECT |
| LOW_TEMP_SAFETY | Hardwired input | LOW_TEMP_SAFETY |
| HIGH_TEMP_SAFETY | Hardwired input | HIGH_TEMP_SAFETY |
| SPACE_TEMP | Hardwired or BACnet input | SPACE_TEMP |
| SPACE_HUMIDITY | Hardwired or BACnet input | SPACE_HUMIDITY |
| SPACE_TEMP_SP_OCC | Adjustable AV | SPACE_TEMP_SP_OCC |
| SPACE_TEMP_SP_UNOCC | Adjustable AV | SPACE_TEMP_SP_UNOCC |
| SPACE_HUM_SP_OCC | Adjustable AV | SPACE_HUM_SP_OCC |
| SPACE_HUM_SP_UNOCC | Adjustable AV | SPACE_HUM_SP_UNOCC |
| TEMP_CLG_DB | Adjustable AV | TEMP_CLG_DB |
| TEMP_HTG_DB | Adjustable AV | TEMP_HTG_DB |
| HUM_ENABLE_DB | Adjustable AV | HUM_ENABLE_DB |
| HUM_DISABLE_DB | Adjustable AV | HUM_DISABLE_DB |
| DEHUM_ENABLE_DELAY_SEC | Adjustable AV | DEHUM_ENABLE_DELAY_SEC |

## Outputs / Publics

| Script Output | Used By |
|---|---|
| UNIT_AVAILABLE | CHW / EDH / DHU / SAF |
| OCC_MODE | SETPOINT / CHW / EDH / DHU / SAF |
| UNOCC_MODE | SETPOINT / CHW / EDH / DHU / SAF |
| COOL_MODE | SETPOINT / CHW |
| HEAT_MODE | SETPOINT / EDH |
| DEHUM_ENABLE | SETPOINT / DHU |
| FIRE_SHUTDOWN | SETPOINT / CHW / EDH / DHU / SAF / MAIN |
| SAFETY_LOCKOUT | SETPOINT / CHW / EDH / DHU / SAF / MAIN |
| LOW_TEMP_MODE | SETPOINT / CHW / DHU / SAF |
| HIGH_TEMP_MODE | SETPOINT / EDH / DHU / SAF |
| ACTIVE_TEMP_SP | optional graphics / trend only |
| ACTIVE_HUM_SP | optional graphics / trend only |
| COOL_ENABLE_SP | optional graphics / trend only |
| HEAT_ENABLE_SP | optional graphics / trend only |
| HUM_ENABLE_SP | optional graphics / trend only |
| HUM_DISABLE_SP | optional graphics / trend only |
| MODE_CODE | graphics / status |

---

# Binding Map — HRC_AHU_B_NV_SETPOINT_MANAGER

## Inputs

### From MODE DETERMINATION

| Script Input | Bind To |
|---|---|
| OCC_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.OCC_MODE |
| UNOCC_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.UNOCC_MODE |
| COOL_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.COOL_MODE |
| HEAT_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.HEAT_MODE |
| DEHUM_ENABLE | HRC_AHU_B_NV_MODE_DETERMINATION.DEHUM_ENABLE |
| LOW_TEMP_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.LOW_TEMP_MODE |
| HIGH_TEMP_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.HIGH_TEMP_MODE |
| FIRE_SHUTDOWN | HRC_AHU_B_NV_MODE_DETERMINATION.FIRE_SHUTDOWN |
| SAFETY_LOCKOUT | HRC_AHU_B_NV_MODE_DETERMINATION.SAFETY_LOCKOUT |

### Adjustable setpoints

| Script Input | Type | Bind To |
|---|---|---|
| SPACE_TEMP_SP_OCC | Adjustable AV | SPACE_TEMP_SP_OCC |
| SPACE_TEMP_SP_UNOCC | Adjustable AV | SPACE_TEMP_SP_UNOCC |
| SPACE_HUM_SP_OCC | Adjustable AV | SPACE_HUM_SP_OCC |
| SPACE_HUM_SP_UNOCC | Adjustable AV | SPACE_HUM_SP_UNOCC |
| SF_FLOW_DP_SP_OCC | Adjustable AV | SF_FLOW_DP_SP_OCC |
| SF_FLOW_DP_SP_COOL | Adjustable AV | SF_FLOW_DP_SP_COOL |
| SF_FLOW_DP_SP_HEAT | Adjustable AV | SF_FLOW_DP_SP_HEAT |
| SF_FLOW_DP_SP_DEHUM | Adjustable AV | SF_FLOW_DP_SP_DEHUM |
| SF_FLOW_DP_SP_SAFETY | Adjustable AV | SF_FLOW_DP_SP_SAFETY |

## Outputs / Publics

| Script Output | Used By |
|---|---|
| SPACE_TEMP_SP_ACTIVE | CHW / EDH |
| SPACE_HUM_SP_ACTIVE | graphics / trend |
| SF_FLOW_DP_SP_ACTIVE | SAF |
| SETPOINT_MODE_CODE | graphics / status |

---

# Binding Map — HRC_AHU_B_NV_CHW_VALVE_CONTROL

## Inputs

### From MODE DETERMINATION

| Script Input | Bind To |
|---|---|
| UNIT_AVAILABLE | HRC_AHU_B_NV_MODE_DETERMINATION.UNIT_AVAILABLE |
| OCC_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.OCC_MODE |
| UNOCC_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.UNOCC_MODE |
| COOL_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.COOL_MODE |
| FIRE_SHUTDOWN | HRC_AHU_B_NV_MODE_DETERMINATION.FIRE_SHUTDOWN |
| SAFETY_LOCKOUT | HRC_AHU_B_NV_MODE_DETERMINATION.SAFETY_LOCKOUT |
| LOW_TEMP_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.LOW_TEMP_MODE |

### Process input

| Script Input | Type | Bind To |
|---|---|---|
| SPACE_TEMP | Hardwired/BACnet input | SPACE_TEMP |

### From SETPOINT MANAGER

| Script Input | Bind To |
|---|---|
| SPACE_TEMP_SP_ACTIVE | HRC_AHU_B_NV_SETPOINT_MANAGER.SPACE_TEMP_SP_ACTIVE |

### Adjustable tuning / limits

| Script Input | Type | Bind To |
|---|---|---|
| CHW_PID_P | Adjustable AV | CHW_PID_P |
| CHW_PID_I | Adjustable AV | CHW_PID_I |
| CHW_PID_D | Adjustable AV | CHW_PID_D |
| CHW_MIN_POS | Adjustable AV | CHW_MIN_POS |
| CHW_MAX_POS | Adjustable AV | CHW_MAX_POS |
| CHW_OFF_POS | Adjustable AV | CHW_OFF_POS |
| CHW_FREEZE_POS | Adjustable AV | CHW_FREEZE_POS |

## Outputs / Publics

| Script Output | Used By |
|---|---|
| CHW_VALVE_REQUEST | MAIN |
| CHW_VALVE_PID_OUT | graphics / trend |
| CHW_VALVE_MODE_CODE | graphics / status |

---

# Binding Map — HRC_AHU_B_NV_EDH_CONTROL

## Inputs

### From MODE DETERMINATION

| Script Input | Bind To |
|---|---|
| UNIT_AVAILABLE | HRC_AHU_B_NV_MODE_DETERMINATION.UNIT_AVAILABLE |
| OCC_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.OCC_MODE |
| UNOCC_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.UNOCC_MODE |
| HEAT_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.HEAT_MODE |
| FIRE_SHUTDOWN | HRC_AHU_B_NV_MODE_DETERMINATION.FIRE_SHUTDOWN |
| SAFETY_LOCKOUT | HRC_AHU_B_NV_MODE_DETERMINATION.SAFETY_LOCKOUT |
| HIGH_TEMP_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.HIGH_TEMP_MODE |

### Process / hardwired inputs

| Script Input | Type | Bind To |
|---|---|---|
| SPACE_TEMP | Hardwired/BACnet input | SPACE_TEMP |
| EDH_SS | Hardwired input | EDH_SS |
| EDH_STATUS | Hardwired input | EDH_STATUS |

### From SETPOINT MANAGER

| Script Input | Bind To |
|---|---|
| SPACE_TEMP_SP_ACTIVE | HRC_AHU_B_NV_SETPOINT_MANAGER.SPACE_TEMP_SP_ACTIVE |

### Adjustable tuning / limits

| Script Input | Type | Bind To |
|---|---|---|
| EDH_PID_P | Adjustable AV | EDH_PID_P |
| EDH_PID_I | Adjustable AV | EDH_PID_I |
| EDH_PID_D | Adjustable AV | EDH_PID_D |
| EDH_MIN_POS | Adjustable AV | EDH_MIN_POS |
| EDH_MAX_POS | Adjustable AV | EDH_MAX_POS |
| EDH_OFF_POS | Adjustable AV | EDH_OFF_POS |

## Outputs / Publics

| Script Output | Used By |
|---|---|
| EDH_REQUEST | MAIN |
| EDH_PID_OUT | graphics / trend |
| EDH_AVAILABLE | graphics / status / alarm logic |
| EDH_MODE_CODE | graphics / status |

---

# Binding Map — HRC_AHU_B_NV_DHU_CONTROL

## Inputs

### From MODE DETERMINATION

| Script Input | Bind To |
|---|---|
| UNIT_AVAILABLE | HRC_AHU_B_NV_MODE_DETERMINATION.UNIT_AVAILABLE |
| OCC_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.OCC_MODE |
| UNOCC_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.UNOCC_MODE |
| DEHUM_ENABLE | HRC_AHU_B_NV_MODE_DETERMINATION.DEHUM_ENABLE |
| FIRE_SHUTDOWN | HRC_AHU_B_NV_MODE_DETERMINATION.FIRE_SHUTDOWN |
| SAFETY_LOCKOUT | HRC_AHU_B_NV_MODE_DETERMINATION.SAFETY_LOCKOUT |
| LOW_TEMP_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.LOW_TEMP_MODE |
| HIGH_TEMP_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.HIGH_TEMP_MODE |

### Hardwired inputs

| Script Input | Type | Bind To |
|---|---|---|
| DHU_ALARM | Hardwired input | DHU_ALARM |

## Outputs / Publics

| Script Output | Used By |
|---|---|
| DHU_REQUEST | MAIN |
| DHU_AVAILABLE | graphics / status |
| DHU_MODE_CODE | graphics / status |

---

# Binding Map — HRC_AHU_B_NV_SAF_CONTROL

## Inputs

### From MODE DETERMINATION

| Script Input | Bind To |
|---|---|
| UNIT_AVAILABLE | HRC_AHU_B_NV_MODE_DETERMINATION.UNIT_AVAILABLE |
| OCC_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.OCC_MODE |
| UNOCC_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.UNOCC_MODE |
| FIRE_SHUTDOWN | HRC_AHU_B_NV_MODE_DETERMINATION.FIRE_SHUTDOWN |
| SAFETY_LOCKOUT | HRC_AHU_B_NV_MODE_DETERMINATION.SAFETY_LOCKOUT |
| LOW_TEMP_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.LOW_TEMP_MODE |
| HIGH_TEMP_MODE | HRC_AHU_B_NV_MODE_DETERMINATION.HIGH_TEMP_MODE |

### Process / hardwired inputs

| Script Input | Type | Bind To |
|---|---|---|
| SF_FLOW_DP | Hardwired/BACnet input | SF_FLOW_DP |
| VFD_FAULT | Hardwired input | VFD_FAULT |
| SAF_STATUS | Hardwired input | SAF_STATUS |

### From SETPOINT MANAGER

| Script Input | Bind To |
|---|---|
| SF_FLOW_DP_SP_ACTIVE | HRC_AHU_B_NV_SETPOINT_MANAGER.SF_FLOW_DP_SP_ACTIVE |

### Adjustable tuning / limits

| Script Input | Type | Bind To |
|---|---|---|
| SAF_PID_P | Adjustable AV | SAF_PID_P |
| SAF_PID_I | Adjustable AV | SAF_PID_I |
| SAF_PID_D | Adjustable AV | SAF_PID_D |
| SAF_SPEED_MIN | Adjustable AV | SAF_SPEED_MIN |
| SAF_SPEED_MAX | Adjustable AV | SAF_SPEED_MAX |
| SAF_SPEED_STARTUP | Adjustable AV | SAF_SPEED_STARTUP |
| SAF_SPEED_OFF | Adjustable AV | SAF_SPEED_OFF |

## Outputs / Publics

| Script Output | Used By |
|---|---|
| SAF_RUN_REQUEST | MAIN |
| SAF_SPEED_REQUEST | MAIN |
| SAF_SPEED_PID_OUT | graphics / trend |
| SAF_AVAILABLE | graphics / status |
| SAF_MODE_CODE | graphics / status |

---

# Binding Map — HRC_AHU_B_NV_MAIN_CONTROL

## Inputs

### From MODE DETERMINATION

| Script Input | Bind To |
|---|---|
| FIRE_SHUTDOWN | HRC_AHU_B_NV_MODE_DETERMINATION.FIRE_SHUTDOWN |
| SAFETY_LOCKOUT | HRC_AHU_B_NV_MODE_DETERMINATION.SAFETY_LOCKOUT |

### Hardwired input

| Script Input | Type | Bind To |
|---|---|---|
| SAF_STATUS | Hardwired input | SAF_STATUS |

### From equipment request scripts

| Script Input | Bind To |
|---|---|
| CHW_VALVE_REQUEST | HRC_AHU_B_NV_CHW_VALVE_CONTROL.CHW_VALVE_REQUEST |
| EDH_REQUEST | HRC_AHU_B_NV_EDH_CONTROL.EDH_REQUEST |
| DHU_REQUEST | HRC_AHU_B_NV_DHU_CONTROL.DHU_REQUEST |
| SAF_RUN_REQUEST | HRC_AHU_B_NV_SAF_CONTROL.SAF_RUN_REQUEST |
| SAF_SPEED_REQUEST | HRC_AHU_B_NV_SAF_CONTROL.SAF_SPEED_REQUEST |

### Adjustable safe values / timing

| Script Input | Type | Bind To |
|---|---|---|
| CHW_OFF_POS | Adjustable AV | CHW_OFF_POS |
| EDH_OFF_POS | Adjustable AV | EDH_OFF_POS |
| SAF_SPEED_OFF | Adjustable AV | SAF_SPEED_OFF |
| SAF_PROOF_DELAY_SEC | Adjustable AV | SAF_PROOF_DELAY_SEC |

## Final outputs

| Script Output | Bind To |
|---|---|
| CHW_VALVE_CMD | Hardwired AO CHW_VALVE_CMD |
| EDH_CMD | Hardwired AO EDH_CMD |
| DHU_SS | Hardwired DO DHU_SS |
| SAF_SS | Hardwired DO SAF_SS |
| SAF_SPEED_CMD | Hardwired AO SAF_SPEED_CMD |
| FAN_PROVEN | graphics / alarm logic / status |
| FAN_PROOF_FAILED | alarm/status |
| MAIN_MODE_CODE | graphics / status |

---

# Master Point Cross-Reference

## Hardwired inputs and where they bind

| Field Point | Bound To |
|---|---|
| FIRE_ALARM | MODE DETERMINATION |
| VAULT_H20_DETECT | MODE DETERMINATION |
| LOW_TEMP_SAFETY | MODE DETERMINATION |
| HIGH_TEMP_SAFETY | MODE DETERMINATION |
| SPACE_TEMP | MODE DETERMINATION, CHW CONTROL, EDH CONTROL |
| SPACE_HUMIDITY | MODE DETERMINATION |
| DHU_ALARM | DHU CONTROL |
| EDH_SS | EDH CONTROL |
| EDH_STATUS | EDH CONTROL |
| SF_FLOW_DP | SAF CONTROL |
| SAF_STATUS | SAF CONTROL, MAIN CONTROL |
| VFD_FAULT | SAF CONTROL |
| RA_TEMP | graphics / trend / optional alarms |
| RA_HUMIDITY | graphics / trend / optional alarms |
| OA_TEMP | graphics / trend / optional alarms |
| OA_CO2 | graphics / trend / optional alarms |
| MA_TEMP | graphics / trend / optional alarms |
| CHW_DAT | graphics / trend / optional alarms |

## Hardwired outputs and their owning script

| Field Output | Owning Script |
|---|---|
| CHW_VALVE_CMD | MAIN CONTROL |
| EDH_CMD | MAIN CONTROL |
| DHU_SS | MAIN CONTROL |
| SAF_SS | MAIN CONTROL |
| SAF_SPEED_CMD | MAIN CONTROL |

---

# Recommended Execution Order

This is the order to run the scripts in WorkStation.

| Order | Script |
|---|---|
| 1 | HRC_AHU_B_NV_MODE_DETERMINATION |
| 2 | HRC_AHU_B_NV_SETPOINT_MANAGER |
| 3 | HRC_AHU_B_NV_CHW_VALVE_CONTROL |
| 4 | HRC_AHU_B_NV_EDH_CONTROL |
| 5 | HRC_AHU_B_NV_DHU_CONTROL |
| 6 | HRC_AHU_B_NV_SAF_CONTROL |
| 7 | HRC_AHU_B_NV_MAIN_CONTROL |
