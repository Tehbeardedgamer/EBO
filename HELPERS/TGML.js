const xlsx = require('xlsx');
const fs = require('fs');

// Load the Excel file
const workbook = xlsx.readFile('HRC BInary Values.xlsx'); // Ensure correct filename

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
const data = xlsx.utils.sheet_to_json(sheet);

// Function to generate TGML from binary data
function generateTGML(data) {
    return data.map(point => `
    <Group>
        <Text FontFamily="Arial" FontSize="20" FontStyle="Normal"
            FontWeight="Bold" HorizontalAlign="Left" Id="NAME"
            Left="43.11754035949707" Opacity="1.0" Stroke="#E8F7FF"
            TextDecoration="None" Top="110.3884506225586"
                VerticalAlign="Top"><![CDATA[${point.POINTNAME}]]><Expose
                ExposedAttribute="Content" Name="Label"/>
        </Text>
        <Text Decimals="2" FontFamily="Arial" FontSize="20"
            FontStyle="Normal" FontWeight="Bold"
            HorizontalAlign="Center" Id="VALUE" Left="500.6475403594968"
            Name="" Opacity="1.0" Stroke="${point["FALSE COLOR"]}" TextDecoration="None"
            Top="110.3884506225586" VerticalAlign="Top">
            <Expose ExposedAttribute="Decimals" Name="Decimals"/>
            <Expose ExposedAttribute="Content" Name="Signal"/>
            <Bind Attribute="Stroke" Name="${point["BIND NAME"]}">
                <Expose ExposedAttribute="Name" Name="BindName"/>
                <ConvertValue AttributeValue="${point["FALSE COLOR"]}" SignalEqualTo="0"/>
                <ConvertValue AttributeValue="${point["TRUE COLOR"]}" SignalEqualTo="1"/>
                <ConvertStatus Error="#C00000" Forced="#FF8000" Stored="#0000FF">
                    <Expose ExposedAttribute="Error" Name="ErrorColor"/>
                    <Expose ExposedAttribute="Stored" Name="StoredColor"/>
                    <Expose ExposedAttribute="Forced" Name="ForcedColor"/>
                </ConvertStatus>
            </Bind>
            <![CDATA[SIGNAL]]>
            <Bind Attribute="Content" Name="${point["BIND NAME"]}">
                <Expose ExposedAttribute="Name" Name="BindName"/>
                <ConvertValue AttributeValue="${point.TRUE}" Name="TRUE" SignalEqualTo="1"/>
                <ConvertValue AttributeValue="${point.FALSE}" Name="FALSE" SignalEqualTo="0"/>
            </Bind>
        </Text>
    </Group>`).join("\n");
}

// Generate the TGML from Excel data
const tgmlOutput = generateTGML(data);

// Save TGML to a file
fs.writeFileSync('output_binary.tgml', tgmlOutput, 'utf8');

console.log("TGML file for binary points generated successfully!");
