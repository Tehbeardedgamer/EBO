DEVICE CHECKS

IF DEVICE FAIL, DEVICE DOWN, PASS THEN DEVICE IS AVAIL FOR SEQ.

ONCE SEQ HAS BEEN ESTABLISHED, THE FOLLOWING CHECKS ARE MADE
    - DEVICE FLOW SWITCH
    - DEVICE LOW PRESS
    - DEVICE HIGH PRESS
    - DEVICE ISO VALVE OPEN
    - DEVICE MAINTENANCE REQUIRED

IF ALL THESE PASS THEN THE DEVICE IS AVAILABLE TO START.


CHW SP 
    COMPLETED
 
CHW STAGING
    SET LOAD - TODO
    SET STAGING - TODO

CHW PUMP
    SET STAGING - TODO




SET BINDS for CHILLERS BEFORE SEQUENCING.

CHILLER 1 = DEVICE_NA_1

CHILLER 1 = DEVICE_AVAIL_1
IF CH_DOWN_1 or CH_FAIL_1 or CH_PRESS_LO_1 or CH_PRESS_HI_1 or CH_MAINT_1 



LOW PRESS / HIGH PRESS = FAIL
MAINTENANCE = DOWN



IF LOW OR HIGH PRESS ALARMS TRIP then it auto fails.

EACH CHILLER HAS FLOW METER BUILT IN VA BACNET


CHECK DEVICE_N UPDATES WITHIN SAME STAGE / WRITE SETARTUP FOR EACH CHILLERS AND HAVE THAT CALLED WHEN DEVICE IS CALLED TO START FOR STAGING








STAGING
CHECK INI, to re check values after each stage within  stager. 

DOAS 2 

No ERW SS and no way to control ERW SPEED as sequence requires

DOAS 1 and 2 EXA and SA Fans

COORDINATE TIMING WITH THE DAMPER ACTUATOR STROKE TIME.
EXHAUST FAN OPERATION SHALL BE PROVEN VIA CURRENT SENSOR ON EACH FAN. - Dont have any of these 

F. DOAS-2 EXHAUST FAN SHALL CFM TRACK THE SUPPLY FAN TO MAINTAIN POSITIVE PRESSURE IN THE FACTORY SPACE.
a. THE TRACKING OFFSET SHALL BE FIELD DETERMINED. ALL DOORS SHALL BE CLOSED THEN EXHAUST FAN OFFSET SHALL BE ADJUSTED UNTIL THE
FACTORY IS NEUTRAL TO SLIGHTLY POSITIVE WITH PROPER OPERATION OF DOOR CLOSURES.
b. THE BUILDING AUTOMATION SYSTEM SHALL MONITOR QUANTITY OF EXHAUST FANS OPERATING IN THE FACTORY SPACE. AS FANS ARE ENERGIZED, THE
EXHAUST FAN OFFSET SHALL BE INCREMENTALLY DECREASED DOWN TO MINIMUM FAN SPEED. REFER TO FUTURE BID PACKAGES FOR QTY AND SIZE
OF EXHAUST FANS.


NEED TO RESET Time on the BUILDING PRESSURE ABOVE AND BELOW



FEEDBACK -


# Let des know about any 


Based on the provided sequence for the Air Handler Unit (AHU 1A-1L and 2A-2D) here is a list of some things that come to mind. 

Mode Determination:
The sequence does describe how to operate in cooling, heating, and dehumidification modes when the AHU is in "Occupied Mode." However, there is no clear description of how the system determines which mode (cooling, heating, dehumidification) to be in. Typically, a sequence would include conditions such as "if the zone temperature is above setpoint and the humidity is below setpoint, enter cooling mode."
 */ TEST AND BALANCE 

Supply Fan Control:
The sequence mentions that the AHU should be enabled in both cooling and heating modes, but there's no specific directive on when and how to start the supply fans or how to control their speed. This is a significant oversight as the operation of supply fans is crucial for the AHU's functioning.

Supply Fan Variable Flow:
It’s mentioned that the AHU has "TWO (2) VARIABLE FLOW DRAW-THRU SUPPLY FANS," but there's no sequence that explains how to vary the flow or under what conditions to adjust the fan speed.
 
 */ TEST AND BALANCE 

Unoccupied Mode:
The sequence describes the "Occupied Mode," but there's no mention of what should happen in "Unoccupied Mode." Typically, an AHU would have different operations for when the space is not occupied to save energy.

*/ SHUT EVERYTHING DOWN

Reset Strategies:
Often, AHU sequences will include reset strategies for supply air temperature or static pressure based on conditions like zone demands. These are missing here.
*/

Filter Status:
While the AHU has MERV 8 and MERV 14 filters, there's no mention of how to monitor filter status or any alarms related to filter status.

*/ TEST AND BALANCE will give SP

Start-Up and Shutdown Sequences:
It would be beneficial to have a clear startup and shutdown sequence for the AHU to ensure equipment longevity and avoid unnecessary wear and tear.
*/

Fans off befoer dampers closed, and FAns on before HW valve open

*/ TEST AND BALANCE

Setpoints:
There is mention of setpoints (like 55°F for chilled water coil leaving temperature), but it's not clear if these are fixed or if they can be adjusted through the Building Automation System (BAS).

Differential Pressures:
It would be helpful to include sequences or alarms related to differential pressures across coils or filters to ensure they are operating efficiently and aren't clogged or restricted.

While the sequence provides a foundational framework for the AHU's operation, it lacks specifics in several key areas that are crucial for an efficient and effective operation.

I can program exactly what the sequences ask for but  AS the sequences for the ARU's 1A-1L and 2A-2D are a copy and paste  as they are written  it's simply only half way done. If I am to come up with my own sequences and controls for these points as they would be considered standard practice it will add significantly more time to their programming for the development and implementation which I assume have not been billed out or accounted for.

```


*/ 



SAFETIES:
A. FREEZE PROTECTION: A FREEZESTAT SWITCH SHALL BE INSTALLED DOWNSTREAM OF THE HEATING COIL. IF A TEMPERATURE OF 38 °F (ADJ.) OR LESS IS DETECTED, THE
FANS SHALL SHUT-OFF VIA HARDWIRED SAFETY. DAMPERS, D-1 AND D-3 SHALL FULLY CLOSE, AND AN AUDIO/VISUAL ALARM SHALL ACTIVATE. THE FREEZESTAT SWITCH
MUST BE MANUALLY RESET UPON CORRECTION OF THE PROBLEM. UPON A MANUAL RESET, THE SYSTEM SHALL RETURN TO NORMAL OPERATION.

B. LOSS OF POWER: UPON A LOSS OF POWER, THE CONTROL VALVES SERVING CHILLED AND HOT WATER COILS SHALL FAIL OPEN.

C. OVER PRESSURIZATION CONTROL: A HIGH STATIC PRESSURE SWITCH SHALL BE LOCATED AT THE SUPPLY AIR OUTLET, BEFORE ANY FIRE DAMPERS OR SMOKE
DAMPERS. IF THE PRESSURE IN THE OA DUCT EXCEEDS 3.0" W.G. LOCALLY (ADJ.), THEN ALL FANS SHALL SHUT-OFF VIA HARDWIRED SAFETY. UPON A MANUAL RESET OF
THE SWITCH, THE SYSTEM SHALL RETURN TO NORMAL OPERATION.
D. UNDER PRESSURIZATION CONTROL: A LOW STATIC PRESSURE SWITCH SHALL BE LOCATED AT THE EXHAUST AIR INLET, AFTER ANY FIRE DAMPERS OR SMOKE
DAMPERS. IF THE PRESSURE IN THE EA DUCT EXCEEDS -3.0" W.G. LOCALLY (ADJ.), THEN ALL FANS SHALL SHUT-OFF VIA HARDWIRED SAFETY. UPON A MANUAL RESET OF
THE SWITCH, THE SYSTEM SHALL RETURN TO NORMAL OPERATION.
E. SMOKE SHUTDOWN: A SMOKE DETECTOR SHALL BE LOCATED IN THE SUPPLY AND RETURN AIR DUCTS. IF SMOKE IS DETECTED, THE SUPPLY AND EXHAUST FANS SHALL
SHUT-OFF VIA HARDWIRED SAFETY AND AN AUDIO/VISUAL ALARM WILL ACTIVATE. UPON CORRECTION, THE SYSTEM SHALL BE RESET AND RETURN TO NORMAL
OPERATION. COORDINATE WITH FIRE ALARM SYSTEM.
F. FROST PROTECTION SEQUENCE FOR THE HEAT WHEEL: THE HEAT RECOVERY LOW LIMIT SETPOINT (HRLL-SP) SHALL BE PER THE MANUFACTURERS TEMPERATURE
SETPOINT. TO PREVENT FREEZING, IF T-6 (EA) DROPS BELOW THE HRLL-SP, THE BYPASS DAMPER D-3 SHALL OPEN TO BYPASS WHEEL.
G. EMERGENCY HVAC/VENTILATION POWER-OFF BUTTON (EPO): IF THE EMERGENCY POWER SHUTDOWN IS ACTIVATED THEN DOAS-1 SHALL BE DISABLED AND D-1 AND D-3
CONFIRMED TO BE CLOSED.
H. THE HOT WATER VALVE, HV-1, SHALL MODULATE TO MAINTAIN A CABINET TEMPERATURE, AT T-3, OF 55°F WHEN THE DOAS IS OFF.
I. MAX VENTILATION OVERRIDE: UPON ACTIVATION OF A PUSHBUTTON SWITCH, THE DOAS SHALL INCREASE OA CFM TO MAXIMUM SETPOINT FOR 20 MINUTES (ADJ.). EACH
DOAS SHALL BE PROVIDED WITH A SWITCH. ACTIVATING ANY OF THE (3) SWITCHES ASSOCIATED WITH EITHER DOAS-2A, 2B, OR 2C SHALL ACTIVATE THIS SEQUENCE FOR
DOAS-2, 2B, AND 2C. ACTIVATING THE SWITCH ASSOCIATED WITH DOAS-2D SHALL ONLY ACTIVATE THIS SEQUENCE FOR DOAS-2D.




EMERGENCY HVAC/VENTILATION POWER-OFF BUTTON (EPO): IF THE EMERGENCY POWER SHUTDOWN IS ACTIVATED THEN DOAS-1 SHALL BE DISABLED AND D-1 AND D-3
CONFIRMED TO BE CLOSED. 
' create program for this and the Epo ALARM.








THINGS FOR CHRIS.

ALL OVAV's

ALARMS:

IF THE DAMPER POSITION IS 0%, AND AIRFLOW SENSOR READING IS ABOVE 10% OF THE COOLING MAXIMUM AIRFLOW SET POINT FOR 10 MINUTES WHILE THE FAN
SERVING THE ZONE IS PROVEN ON.

AIRFLOW SENSOR CALIBRATION: IF THE FAN SERVING THE ZONE HAS BEEN OFF FOR
10 MINUTES, AND THE AIRFLOW SENSOR READING IS ABOVE 10% OF THE COOLING MAXIMUM AIRFLOW SET POINT.

    -I do not have any idea how to determine what fan if any is serving the space that this section of the sequence referrs to. There is nothing on the schedule that states this information.

CONFRENCE ROOM OVAV's


LEVEL 4 ALARMS:
IF THE DUCT STATIC IS AT MAXIMUM SETPOINT FOR 24 HOURS (ADJ.) AND THE SAME
OVAV IS ABOVE 95%.

    - THERE IS NO DUCT STATIC PRESSURE SENSOR TO MONITOR. 

TYPICAL ROOM OVAV's
    
    ZONE 2-03
    THERE ARE (2) CO2 SENSORS FOR THIS ZONE. THE OAV BOX SHALL SIGNAL SELECT BASED ON THE WORST CASE READING. THERE IS ALSO
    AN INDEPENDANT TEMPERATURE SENSOR (APART FROM THE VHP SERVING THIS SPACE) THAT SHALL OPEN/CLOSE A DAMPER FOR THE IT
    WORKSHOP.

    - There is no additional indepenant temperature sensor or damper that I can find anywhere and I have no idea what the IT WORKSHOP is. This does not seem to exist for our job maybe a copy and paste error from the engineers used from another job.


    DUCT STATIC PRESSURE RESET REQUESTS:
    THE DDC SYSTEM SHALL DETERMINE THE OVAV WITH GREATEST DAMPER OPEN POSITION ONCE EVERY 10 MINUTES.
    THE DOAS OUTSIDE AIR STATIC PRESSURE SETPOINT SHALL DECREASE BY 0.1" WC IF ALL OVAVS ARE OPEN 75% (ADJ.) OR LESS.
    THE DOAS OUTSIDE AIR STATIC PRESSURE SETPOINT SHALL INCREASE BY 0.1" WC IF THE GREATEST OPEN DAMPER POSITION FOR AN
    OVAV IS 95% (ADJ.) OR GREATER.
    SETPOINT SHALL BE RESET BETWEEN MINIMUM AND MAXIMUM SETPOINT OF 0.5" WC AND 1.50 ” WC.

        -There are no DUCT STATIC PRESSURE SENSORS to monitor. Additionally nothing is being controlled to static pressure.