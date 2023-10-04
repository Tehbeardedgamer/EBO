class HVACControl:

    def __init__(self):
        # Initialize states of components
        self.outside_air_damper_position = 'CLOSED'
        self.return_air_damper_position = 'CLOSED'
        self.supply_fan_speed = 0  # Assuming 0 to 100 scale
        self.supply_fan_status = 'OFF'
        self.cooling_coil_valve_position = 'CLOSED'
        self.hot_water_coil_valve_position = 'CLOSED'

    def start_up(self):
        # 1. Open outside air damper to minimum position
        self.open_outside_air_damper()

        # 2. Open return air damper
        self.open_return_air_damper()

        # 3. Start supply fan and ramp up speed
        self.start_supply_fan()

        # 4. Confirm supply fan status
        self.check_supply_fan_status()

        # 5. Activate cooling coil and hot water coil control sequence
        self.activate_coil_control_sequence()

    def open_outside_air_damper(self):
        self.outside_air_damper_position = 'MINIMUM'
        print("Outside air damper is now at MINIMUM position.")

    def open_return_air_damper(self):
        self.return_air_damper_position = 'OPEN'
        print("Return air damper is now OPEN.")

    def start_supply_fan(self):
        self.supply_fan_status = 'ON'
        for speed in range(0, 101, 5):  # Ramp up speed in increments of 5
            self.supply_fan_speed = speed
            print(f"Supply fan speed is now at {speed}%.")
            # Wait for a short period between increments (assuming a short delay for demonstration)
            # time.sleep(0.1)

    def check_supply_fan_status(self):
        if self.supply_fan_status == 'ON':
            print("Supply fan status is PROVEN.")
        else:
            print("Error: Supply fan status NOT PROVEN.")

    def activate_coil_control_sequence(self):
        # Start with valves closed and then initiate the sequence
        self.cooling_coil_valve_position = 'OPEN'
        self.hot_water_coil_valve_position = 'OPEN'
        print("Cooling coil and hot water coil control sequence activated.")

# Test the sequence
hvac = HVACControl()
hvac.start_up()