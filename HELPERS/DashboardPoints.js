const xlsx = require('xlsx');
const fs = require('fs');

// Load Excel file
const workbook = xlsx.readFile('Chiller Points List.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

// Templates
const generateBinaryComponent = (pointName, bacnetName) => `
<Component Clip="False" ContentHeight="22.34"
    ContentWidth="185.29" Height="22.339999999999918"
    Id="${pointName}" Left="195.33003417968752"
    Top="415.8034594726562" Width="185.29000000000002">
    <Text Fill="None" FontFamily="Arial" FontSize="20"
        FontStyle="Normal" FontWeight="Bold"
        HorizontalAlign="Left" Left="27.461813694762895"
        Opacity="1.0" Stroke="#E8F7FF" TextDecoration="None"
        Top="11.168482452392709"
        VerticalAlign="Middle"><![CDATA[${pointName}]]><Expose
            ExposedAttribute="Content" Name="PointName"/>
    </Text>
    <Rectangle Fill="#06D6A0" Height="20.0"
        Left="-0.001774787902832" Opacity="1.0" RadiusX="0.0"
        RadiusY="0.0" Stroke="None" StrokeDashArray="0.0"
        StrokeWidth="1.0" Top="1.168476104736328" Width="20.0">
        <Bind Attribute="Fill" Content=""
            Name="${bacnetName}" PreventDefault="True">
            <ConvertValue AttributeValue="#06D6A0" SignalEqualTo="1"/>
            <ConvertValue AttributeValue="#F7092D" SignalEqualTo="0"/>
            <Expose ExposedAttribute="Name" Name="BindName"/>
        </Bind>
    </Rectangle>
</Component>
`;

const generateAnalogComponent = (pointName, bacnetName) => `
<Component Clip="False" ContentHeight="22.34"
    ContentWidth="329.93" Height="22.339999999999918"
    Id="${pointName}" Left="192.7200341796875"
    Top="451.6734594726563" Width="329.93">
    <Text Fill="None" FontFamily="Arial" FontSize="20"
        FontStyle="Normal" FontWeight="Bold"
        HorizontalAlign="Left" Left="0.003326416015625"
        Opacity="1.0" Stroke="#E8F7FF" TextDecoration="None"
        Top="11.169162511587274"
        VerticalAlign="Middle"><![CDATA[${pointName}]]><Expose
            ExposedAttribute="Content" Name="PointName"/>
    </Text>
    <Text Fill="None" FontFamily="Arial" FontSize="20"
        FontStyle="Normal" FontWeight="Bold"
        HorizontalAlign="Left" Left="262.15437961273165"
        Opacity="1.0" Stroke="#06D6A0" TextDecoration="None"
        Top="11.169162511587274"
        VerticalAlign="Middle"><![CDATA[VALUE]]><Bind
            Attribute="Content"
            Name="${bacnetName}" PreventDefault="True">
            <Expose ExposedAttribute="Name" Name="BindName"/>
            <Script OnDocumentLoad="" OnSignalChange="signal"><![CDATA[function signal(evt)
{
  var text = evt.getTarget().getParentNode();
  var decimals = parseInt(text.getAttribute("Decimals"));
  if(decimals > 6) decimals = 6;
  if(decimals < 0) decimals = 0;
  var value = new Number(evt.getValue());
  var unit = evt.getUnit();
  if(unit)
    text.setAttribute("Content", value.toFixed(decimals) + " " + unit);
  else
    text.setAttribute("Content", value.toFixed(decimals));
}]]></Script>
        </Bind>
    </Text>
</Component>
`;

// Generate all components
function generateTGML(data) {
    return data.map(row => {
        const rawPoint = row['Point Name'] || '';
        const rawBacnet = row['BACnet Object Name'] || '';
        const objectType = (row['Object Type'] || '').toLowerCase();

        const pointName = rawPoint.trim();
        const bacnetName = rawBacnet.replace(/\s+/g, '').replace(/\n/g, '');

        if (objectType.includes('binary')) {
            return generateBinaryComponent(pointName, bacnetName);
        } else if (objectType.includes('analog')) {
            return generateAnalogComponent(pointName, bacnetName);
        } else {
            console.warn(`⚠️ Skipped unknown object type: "${objectType}"`);
            return '';
        }
    }).join('\n');
}

// Write output file
const output = generateTGML(data);
fs.writeFileSync('output.tgml', output, 'utf8');

console.log("✅ TGML file generated successfully.");
