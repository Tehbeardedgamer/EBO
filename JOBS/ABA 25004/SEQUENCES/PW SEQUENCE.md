## PROCESS WATER SYSTEM CONTROL SEQUENCE



### 1. Process Water System Overview

The process water system consists of the following major equipment:

1. **Four (4) 450-Ton Air-Cooled Chillers (PCH-1 through PCH-4)**  
2. **Four (4) Variable Flow Process Water Distribution Pumps (P-3A through P-3D)**  
   - Each pump is sized at 33% capacity (total of four pumps at 33% each).

---

### 2. General

1. **Chiller Controller Optimization**  
   - Each process chiller controller (PCH-1 through PCH-4) optimizes the staging of each compressor.  
   - A master controller optimizes the staging of the entire chilled water system.  
   - If a chiller fails, the chiller controllers shall automatically enable a redundant chiller module.

2. **Loss of Network Communication Signal**  
   - All systems shall continue working in standalone mode if network communication is lost.

3. **Chiller BACnet MS/TP Communications**  
   - The BAS shall have the capability to command setpoints and provide monitoring via a BACnet MS/TP interface on each chiller.  
   - Coordinate with the Owner to map all required BACnet points.

4. **BACnet IP Communication**  
   - Coordinate BACnet IP communication wiring with the chiller manufacturer.  
   - Provide all necessary hardware, software identifiers, values, and units for BACnet communication.

5. **Process Water Valves**  
   - All valves serving process load equipment are pressure-independent control valves.

6. **Chiller Start Conditions**  
   - A chiller shall not start unless:  
     1. Chiller isolation valve is proven open.  
     2. All safety controls (chilled water flow switch, compressor low-pressure switch, and compressor high-pressure switch) are satisfied.

---

### 3. Continuity of Operation After Electric Power Interruption

- Equipment and controls on normal and backup power automatically return to the previous operating state once power is restored (either through the backup source or normal power if it is restored first).  
- No manual intervention by the operator is required.

---

### 4. Equipment Override

1. **Local Override at Motor Controller**  
   - The operator can override equipment locally using a motor controller (HOA switch or similar).  
   - This provides a choice between remote automatic control or local control.

2. **Maintenance Override Off**  
   - The operator can override the equipment locally (off).  
   - The chiller controller is notified and will enable/disable a redundant chiller as necessary.

---

### 5. Equipment Runtime Calculation

1. **Runtime Tracking**  
   - Runtime begins on a start command and confirmed “on” status; it ends on a stop command and confirmed “off” status.  
   - Total runtime is calculated in hours and aggregated by day, week, month, year, and since initial installation.

2. **Maintenance Interval Monitoring**  
   - The DDC controller compares operating hours to operator-input maintenance intervals (in hours) and issues a warning when approaching a maintenance threshold.

---

### 6. Loss of Normal Power

- Provide all central plant controllers with dual power input:
  1. Normal/Emergency power  
  2. UPS power (provided by the electrical contractor)  
- Coordinate all connections and requirements with the electrical contractor.

---

### 7. Process Water Setpoint

- **Process Water Supply Setpoint**: 75°F (adjustable).  
- This is the default setpoint in the chillers.

---

### 8. Chiller Staging

> **Note**: Some chillers may be installed at a future date. Program as if all four chillers (PCH-1 through PCH-4) are present. Future chillers remain disabled until their corresponding points become available.

1. **Base Load Operation**  
   - PCH-1 through PCH-4 operate as required to meet the process water supply (PWS) temperature setpoint (75°F, adjustable).

2. **Chiller Staging Controller**  
   - The chiller manufacturer may propose a chiller staging controller if required.  
   - When there is a call for cooling, staging occurs as follows:

   #### Stage 1: Call for Process Water
   1. **Open Lead Chiller Control Valve** (PCH-1 through PCH-4).  
      - Staging order is from least runtime to most, updated weekly.  
   2. **Start the Lead Process Water Distribution Pump (P-3A through P-3D)** as required.  
   3. **Confirm Minimum Flow** is exceeded for the lead chiller.  
   4. **Activate the Lead Chiller** once it has reached its minimum flow, maintaining the 75°F (adjustable) setpoint.

   #### Stage 2: Lag Chiller
   - When the lead chiller exceeds 70% load **or** flow measured at F-5 exceeds 90% (adjustable) of total design flow for all operating chillers, proceed in order:
     1. **Open Lag Chiller Control Valve** (PCH-1 through PCH-4).  
     2. **Confirm Minimum Flow** is exceeded for the lag chiller.  
     3. **Activate the Lag Chiller** once it is at minimum flow, maintaining the 75°F (adjustable) setpoint.

   #### Stage 3: Second Lag Chiller
   - When the lead and lag chillers exceed 70% load **or** when flow at F-5 exceeds 90% (adjustable) of total design flow for all operating chillers, proceed in order:
     1. **Open Second Lag Chiller Control Valve** (PCH-1 through PCH-4).  
     2. **Confirm Minimum Flow** is exceeded for the second lag chiller.  
     3. **Activate the Second Lag Chiller**, maintaining the 75°F (adjustable) setpoint.

3. **Staging Down**  
   - If all operating chillers are at 25% (adjustable) load or less, flow at F-5 is below 90% (adjustable) of design flow, and the setpoint is satisfied, disable one chiller.  
   - Continue disabling chillers until only the lead chiller remains.

---

### 9. Minimum Flow

- Two process water system bypass valves are provided to maintain minimum flow. See the pump staging sequence for additional details.

---

### 10. Chiller Fault

- If any operating chiller’s % loaded status does not match the command **and** the process water supply temperature remains above setpoint for 15 minutes (adjustable), that chiller is deactivated and becomes the last-in-line lag chiller until manually reset.  
- The next lag chiller stages on per the normal staging sequence.  
- An alarm is sent to the BAS indicating which chiller is experiencing a potential fault.

---

### 11. Process Water Primary Pumping System Control Sequence

1. **Lead/Lag/Lag/Standby Operation**  
   - Pumps P-3A through P-3D operate on a lead/lag/lag/standby basis.  
   - Lead/lag operation rotates weekly (adjustable).  
   - Staging order is from least runtime hours to most.

2. **Differential Pressure Setpoint Control**  
   - The pumps respond to DPS-2 system pressure differential sensors to maintain the required DP setpoint.

3. **Flow Stability**  
   - Flow stability and rate of change are critical for safe chiller operation.  
   - Control loops must be tuned to avoid rapid, erratic swings that can trigger chiller alarms.

4. **VFD Status Monitoring**  
   - Each pump’s status is monitored from the VFD controller.  
   - If a pump’s status is not proven, it is deactivated and an audio-visual alarm sounds at the BAS.  
   - If water flow fails after a chiller is operating, the backup pump activates.  
   - Once the cause of alarm is resolved, the lead pump is manually reset via the BAS GUI, and the backup pump deactivates.  
   - A 30-second time delay prevents false alarms.

5. **Optimized DP Setpoint**  
   - The TCC, TAB contractor, and commissioning agent initially set the DP setpoint at 8 psi (adjustable) to achieve required flow.  
   - The final setpoint is recorded in the TCC documents.

6. **Control Loop Priority**  
   - 1st priority: Bypass valve responsiveness  
   - 2nd priority: Pump speed responsiveness  
   - 3rd priority: AHU valve control loops (slowest response).

7. **Pump Speed Control**  
   - DPS-2 is wired directly to the chilled water pump primary controller (no bus mapping).  
   - The pump speed ramps up/down to maintain a constant DP at DPS-2A or DPS-2B.  
   - Minimum pump speed is set as required to maintain minimum chiller flow at F-5.

8. **Bypass Valves for Minimum Flow**  
   - Each chiller (PCH-1 through PCH-4) receives required minimum flow via end-of-main bypass valves. Refer to the end-of-main bypass valve sequence.

9. **Pump Speed Logic**  
   - The lead pump continuously checks the lead DP sensor.  
   - If DP is below setpoint, the lead pump increases speed.  
   - If the lead pump exceeds 90% speed for 10 minutes, enable the lag pump. The lag pump ramps up while the lead pump ramps down to match speeds and maintain DP.  
   - If both pumps run at 35% or less for 10 minutes while DP is satisfied, the lag pump shuts off and the lead pump increases speed to maintain DP.  
   - If lead and lag pump both rise above 90% for 10 minutes, enable the second lag pump. The second lag pump ramps up while lead/lag pump speeds reduce.  
   - If all three pumps run at 50% (adjustable) or less for 10 minutes with DP satisfied, the second lag pump shuts off and the remaining two pumps increase speed.

10. **End-of-Main Bypass**  
    - Two end-of-main bypasses are provided (one above the mezzanine and one below).  
    - If a single primary pump operates at minimum speed, both associated bypass valves modulate in tandem to maintain system DP.  
    - If system DP exceeds setpoint by 4 psi (adjustable), both bypass valves open fully. They return to normal once DP is at setpoint.

---

### 12. Chiller/Pump Maintenance Mode Control Sequence

1. **Maintenance Mode**  
   - Each chiller (PCH-1 through PCH-4) or pump (P-3A through P-3D) can enter maintenance mode.  
   - The selected chiller/pump is deactivated and removed from the operating group.

2. **Remaining Equipment Operation**  
   - All other chillers/pumps continue operating under their normal sequences.

3. **Returning to Normal**  
   - When maintenance mode ends, the chiller/pump returns to normal operation.

---

### 13. Process Water Closed-Loop Make-Up Water

1. **Flow Meter Alarm and Emergency Shutdown**  
   - A line-sized, two-position, normally open valve on the make-up water line shall close if make-up water flows at 24 GPM (adjustable) for 2 minutes while the system switch is in normal operating position.

2. **Audible and Visual Alarm**  
   - An alarm on the control panel (near the make-up network) shall sound and an indicator light will show a problem.  
   - A momentary push button silences/acknowledges the alarm and resets the system after necessary repairs.

3. **BAS Interface**  
   - Provide a button on the BAS GUI to disable the alarm during normal fill operations.

---

### 14. Safeties

- If the process water return pressure sensor in the main mechanical room drops 10 psi (adjustable) below system static pressure (indicating a major leak), the process water system shall shut down and generate a **Level 1 Alarm**.

---

### 15. Process Water Alarms

1. **Level 1 Alarm**  
   - **Process Water System Leak Shutdown**.  

2. **Level 2 Alarms**  
   - **Make-Up Water Flow**: Flow meter F-FM2 shows 12 GPM (adjustable) for 2 minutes, indicating a potential load-side piping leak.  
   - **High Temperature Alarm**: Process supply water temperature T-7 is 5°F or more above setpoint for 20 minutes (adjustable).  
   - **Pump Status Mismatch**: Pump status does not equal command for **all** process water distribution pumps, signaling failure of both primary and redundant pumps.

3. **Level 3 Alarms**  
   - **Chiller Alarm**: Typical alarm from any of the four process chillers.  
   - **Pump Status Mismatch (Single Pump)**: Failure of the lead or lag pump when status does not equal command.  
   - **High Temperature Alarm (Slight Deviation)**: T-7 is 3°F above setpoint for 15 minutes.  
   - **High System Delta T**: System delta temperature (T-8 minus T-7) is above 16°F (adjustable).  
   - **Valve Status Mismatch**: Chiller valve does not match command for 15 minutes (adjustable).  
   - **Chiller Low Flow Alarm**: F-5 is below minimum chiller flow for 15 minutes for any process chiller.  
   - **Pressure Differential High Alarm**: DP is 2 psi (adjustable) above setpoint for 20 minutes.  
   - **Pressure Differential Low Alarm**: DP is 2 psi (adjustable) below setpoint for 20 minutes.  
   - **Pump VFD Hardware Alarm**: Hardware alarm from the pump VFD.

4. **Level 4 Alarms**  
   - **Chiller Runtime Maintenance Alarm**: Per manufacturer recommendations.  
   - **Pump Runtime Maintenance Alarm**: Per manufacturer recommendations.  
   - **Loss of BACnet Communication**: Loss of communication to pump VFDs or chiller control panels.
