const xlsx = require('xlsx');
const fs = require('fs');

// Load the Excel file
const workbook = xlsx.readFile('BOILER POINTS BLACKENED.xlsx');

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
const data = xlsx.utils.sheet_to_json(sheet);

// Function to generate TGML from data
function generateTGML(data) {
    return data.map(point => `
    <Group>
        <Text FontFamily="Arial" FontSize="20" FontStyle="Normal"
            FontWeight="Bold" HorizontalAlign="Left" Id="NAME"
            Left="4.5" Opacity="1.0" Stroke="#E8F7FF"
            TextDecoration="None" Top="86.17"
            VerticalAlign="Top"><![CDATA[${point["Object Name"]}]]><Expose
                ExposedAttribute="Content" Name="LABLE"/>
        </Text>
        <Text Decimals="2" FontFamily="Arial" FontSize="20"
            FontStyle="Normal" FontWeight="Bold"
            HorizontalAlign="Center" Id="VALUE" Left="343.03"
            Name="" Opacity="1.0" Stroke="#06D6A0" TextDecoration="None"
            Top="86.17" VerticalAlign="Top">
            <Expose ExposedAttribute="Decimals" Name="Decimals"/>
            <Expose ExposedAttribute="Content" Name="EditModeText"/>
            <Bind Attribute="Stroke" Name="${point["Value"]}">
                <Expose ExposedAttribute="Name" Name="BindName"/>
                <ConvertStatus Error="#C00000" Forced="#FF8000" Stored="#0000FF">
                    <Expose ExposedAttribute="Error" Name="ErrorColor"/>
                    <Expose ExposedAttribute="Stored" Name="StoredColor"/>
                    <Expose ExposedAttribute="Forced" Name="ForcedColor"/>
                </ConvertStatus>
                <Script OnDocumentLoad="" OnSignalChange="signal"><![CDATA[
function signal(evt) {
    var text = evt.getTarget().getParentNode();
    var decimals = parseInt(text.getAttribute("Decimals"));
    if (decimals > 6) decimals = 6;
    if (decimals < 0) decimals = 0;
    var value = new Number(evt.getValue());
    var unit = evt.getUnit();
    text.setAttribute("Content", unit ? value.toFixed(decimals) + " " + unit : value.toFixed(decimals));
}]]></Script>
            </Bind><![CDATA[SIGNAL]]></Text>
        <Text FontFamily="Arial" FontSize="20" FontStyle="Normal"
            FontWeight="Bold" HorizontalAlign="Center" Id="UNIT"
            Left="420.65" Opacity="1.0" Stroke="#E8F7FF"
            TextDecoration="None" Top="86.17"
            VerticalAlign="Top"><![CDATA[${point["Units"]}]]><Expose
                ExposedAttribute="Content" Name="LABLE"/>
        </Text>
        <Text FontFamily="Arial" FontSize="20" FontStyle="Normal"
            FontWeight="Bold" HorizontalAlign="Center" Id="MIN"
            Left="476.81" Opacity="1.0" Stroke="#E8F7FF"
            TextDecoration="None" Top="86.17"
            VerticalAlign="Top"><![CDATA[${point["Min"]}]]><Expose
                ExposedAttribute="Content" Name="LABLE"/>
        </Text>
        <Text FontFamily="Arial" FontSize="20" FontStyle="Normal"
            FontWeight="Bold" HorizontalAlign="Center" Id="MAX"
            Left="530.29" Opacity="1.0" Stroke="#E8F7FF"
            TextDecoration="None" Top="86.17"
            VerticalAlign="Top"><![CDATA[${point["Max"]}]]><Expose
                ExposedAttribute="Content" Name="LABLE"/>
        </Text>
    </Group>`).join("\n");
}

// Generate the TGML from Excel data
const tgmlOutput = generateTGML(data);

// Save TGML to a file
fs.writeFileSync('output.tgml', tgmlOutput, 'utf8');

console.log("TGML file generated successfully!");
