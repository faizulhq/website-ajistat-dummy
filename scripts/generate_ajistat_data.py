import json
import copy

with open('data/programs.json', encoding='utf-8') as f:
    data = json.load(f)

# original data has AjiStat listed under IDs 1..12 and Non-AjiStat >12
# non-AjiStat have tags like AjiBiz, AjiPR, etc.
bootcamps = [p for p in data if p['id'] <= 6][:3]
short_classes = [p for p in data if p['id'] >= 7 and p['id'] <= 12][:5]

# Generate 4 private classes based on the first 4 items
private_classes = []
pc_tools = ['SPSS', 'SmartPLS', 'R Studio', 'Python']
for i, tool in enumerate(pc_tools):
    p = copy.deepcopy(data[i])
    p['id'] = 100 + i
    p['type'] = 'private-class'
    p['title'] = p['title'].replace('Bootcamp', 'Private Class')
    p['slug'] = p['slug'].replace('bootcamp', 'private')
    private_classes.append(p)

# Select all cross-division items
cross_division = [p for p in data if p['id'] >= 13]

final_data = bootcamps + private_classes + short_classes + cross_division

# Fix IDs
for i, p in enumerate(final_data):
    p['id'] = i + 1

with open('data/programs.json', 'w', encoding='utf-8') as f:
    json.dump(final_data, f, indent=2)

print(f'Done! {len(bootcamps)} bootcamps, {len(private_classes)} private, {len(short_classes)} short, {len(cross_division)} cross-div')
